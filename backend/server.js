require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pesapal-ipn', async (req, res) => {
    console.log('📨 PesaPal IPN received:', req.body);

    const { OrderTrackingId, OrderMerchantReference } = req.body;

    if (!OrderTrackingId) {
        return res.status(400).send('Missing OrderTrackingId');
    }

    // Here you can check the transaction status and update your database
    res.status(200).send('OK');
});


// FIXED: Changed default port to match frontend expectation
const PORT = process.env.PORT || 3001;

// PesaPal API Base URLs
const PESAPAL_BASE_URL = process.env.PESAPAL_ENVIRONMENT === 'sandbox'
  ? 'https://cybqa.pesapal.com/pesapalv3'
  : 'https://pay.pesapal.com/v3';

  console.log('Using PesaPal base URL:', PESAPAL_BASE_URL);
  console.log('Environment:', process.env.PESAPAL_ENVIRONMENT);


// Store access token and IPN ID in memory (in production, use Redis or database)
let accessToken = null;
let tokenExpiry = null;
let registeredIpnId = process.env.PESAPAL_IPN_ID || null;

// ===== Get PesaPal Access Token =====
async function getAccessToken() {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Using cached access token');
    return accessToken;
  }

  try {
    console.log('🔄 Requesting new access token...');
    
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Auth/RequestToken`,
      {
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    // FIXED: According to PesaPal docs, the token field is lowercase
    accessToken = response.data.token;
    
    if (!accessToken) {
      console.error('❌ No token in response:', JSON.stringify(response.data, null, 2));
      throw new Error('Token not found in PesaPal response');
    }

    // Token expires in 5 minutes, cache for 4 minutes
    tokenExpiry = Date.now() + (4 * 60 * 1000);
    
    console.log('✅ New access token obtained');
    
    return accessToken;
  } catch (error) {
    console.error('❌ Error getting access token:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error('Failed to authenticate with PesaPal');
  }
}

// ===== Register IPN URL =====
async function registerIPN() {
  // Return cached IPN ID if available
  if (registeredIpnId) {
    console.log('✅ Using existing IPN ID:', registeredIpnId);
    return registeredIpnId;
  }

  try {
    const token = await getAccessToken();
    
    console.log('🔄 Registering IPN URL:', process.env.PESAPAL_IPN_URL);
    
    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`,
      {
        url: process.env.PESAPAL_IPN_URL,
        ipn_notification_type: 'GET'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    registeredIpnId = response.data.ipn_id;
    console.log('✅ IPN registered successfully!');
    console.log('📌 IPN ID:', registeredIpnId);
    console.log('💡 Add this to your .env file: PESAPAL_IPN_ID=' + registeredIpnId);
    
    return registeredIpnId;
  } catch (error) {
    // If IPN already registered, get existing IPN
    if (error.response?.status === 409 || error.response?.data?.message?.includes('already registered')) {
      console.log('⚠️  IPN URL already registered, fetching existing IPN...');
      return await getExistingIPN();
    }
    console.error('❌ Error registering IPN:', error.response?.data || error.message);
    throw error;
  }
}

// ===== Get existing IPN URLs =====
async function getExistingIPN() {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(
      `${PESAPAL_BASE_URL}/api/URLSetup/GetIpnList`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    const ipnList = response.data;
    const matchingIpn = ipnList.find(ipn => ipn.url === process.env.PESAPAL_IPN_URL);
    
    if (matchingIpn) {
      registeredIpnId = matchingIpn.ipn_id;
      console.log('✅ Found existing IPN ID:', registeredIpnId);
      console.log('💡 Add this to your .env file: PESAPAL_IPN_ID=' + registeredIpnId);
      return registeredIpnId;
    } else {
      console.log('⚠️  Available IPNs:', ipnList);
      throw new Error('Could not find matching IPN URL. Please register manually using PesaPal form.');
    }
  } catch (error) {
    console.error('❌ Error fetching IPN list:', error.response?.data || error.message);
    throw error;
  }
}

// ===== Root route =====
app.get('/', (req, res) => {
  res.json({
    message: 'PesaPal Integration Server Running!',
    environment: process.env.PESAPAL_ENVIRONMENT || 'sandbox',
    endpoints: {
      createPayment: 'POST /api/create-payment',
      paymentStatus: 'GET /api/payment-status/:orderTrackingId',
      ipnListener: 'GET /pesapal-ipn'
    }
  });
});

// ===== IPN Listener route =====
// IMPORTANT: This endpoint must be publicly accessible via ngrok
app.get('/pesapal-ipn', async (req, res) => {
  console.log('📨 PesaPal IPN received:', req.query);
  
  const { OrderTrackingId, OrderMerchantReference } = req.query;

  if (!OrderTrackingId) {
    console.error('❌ Missing OrderTrackingId in IPN');
    return res.status(400).send('Missing OrderTrackingId');
  }

  try {
    // Get transaction status
    const token = await getAccessToken();
    const statusResponse = await axios.get(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ Transaction status:', statusResponse.data);
    
    // TODO: Update your database with the payment status
    // Possible statuses:
    // - payment_status_description: "Completed", "Failed", "Invalid"
    // - status_code: 1 (Completed), 2 (Failed), 0 (Invalid), 3 (Reversed)
    
    // Store in your database:
    // - OrderTrackingId
    // - OrderMerchantReference
    // - payment_status_description
    // - amount
    // - payment_method
    // - confirmation_code
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error checking transaction status:', error.response?.data || error.message);
    res.status(500).send('Error processing IPN');
  }
});

// ===== Payment request route =====
app.post('/api/create-payment', async (req, res) => {
  const { plan, amount, period, fullName, phone, email } = req.body;

  // Validate required fields
  if (!plan || !amount || !fullName || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Validate phone number format for Kenya
  let formattedPhone = phone.replace(/\s+/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '254' + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone;
  }

  // Generate unique merchant reference
  const merchantReference = `IMPACT360_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  try {
    // Get access token
    const token = await getAccessToken();

    // Get or register IPN URL
    let ipnId = registeredIpnId;
    if (!ipnId) {
      ipnId = await registerIPN();
    }

    // FIXED: Added callback URL from environment
    const callbackUrl = process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/payment-callback`
      : 'http://localhost:5173/payment-callback';

    // Create payment order
    const orderData = {
      id: merchantReference,
      currency: 'KES',
      amount: parseFloat(amount),
      description: `Impact360 ${plan} Subscription - ${period}`,
      callback_url: callbackUrl,
      notification_id: ipnId,
      billing_address: {
        email_address: email,
        phone_number: formattedPhone,
        country_code: 'KE',
        first_name: fullName.split(' ')[0] || fullName,
        middle_name: '',
        last_name: fullName.split(' ').slice(1).join(' ') || '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        zip_code: ''
      }
    };

    console.log('🔄 Creating payment order:', {
      ...orderData,
      notification_id: ipnId
    });

    const response = await axios.post(
      `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ PesaPal order created:', response.data);

    // Return the redirect URL to the frontend
    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        order_tracking_id: response.data.order_tracking_id,
        merchant_reference: response.data.merchant_reference,
        redirect_url: response.data.redirect_url
      }
    });

  } catch (error) {
    console.error('❌ Payment creation error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to create payment',
      error: error.response?.data || error.message
    });
  }
});

// ===== Check payment status route =====
app.get('/api/payment-status/:orderTrackingId', async (req, res) => {
  const { orderTrackingId } = req.params;

  if (!orderTrackingId) {
    return res.status(400).json({
      success: false,
      message: 'Missing orderTrackingId'
    });
  }

  try {
    const token = await getAccessToken();
    
    console.log('🔄 Checking payment status for:', orderTrackingId);
    
    const response = await axios.get(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ Payment status retrieved:', response.data);

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('❌ Status check error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.response?.data || error.message
    });
  }
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.PESAPAL_ENVIRONMENT || 'sandbox'}`);
  console.log(`📡 IPN URL: ${process.env.PESAPAL_IPN_URL || 'NOT SET'}`);
  console.log(`🔐 IPN ID: ${registeredIpnId || 'NOT SET - Will register on first payment'}`);
  console.log('🚀 ========================================');
  console.log('💡 Make sure your ngrok tunnel is running!');
  console.log('💡 Run: ngrok http ' + PORT);
  console.log('💡 Then set PESAPAL_IPN_URL in .env to your ngrok URL + /pesapal-ipn');
  console.log('🚀 ========================================');
});