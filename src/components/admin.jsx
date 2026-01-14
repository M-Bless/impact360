import React, { useState, useEffect } from 'react';
import { Search, Check, X, Eye, Edit, Trash2, RefreshCw, Mail, Clock, CheckCircle, XCircle, LogOut, Lock, Menu } from 'lucide-react';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { db, auth } from '../firebase/firebase';
import QRCode from 'qrcode';
import emailjs from '@emailjs/browser';

// ========================================
// EMAILJS CONFIGURATION - UPDATE THESE!
// ========================================
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const TEMPLATE_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [notification, setNotification] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        loadSubmissions();
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const q = query(
      collection(db, 'subscriptions'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    }, (error) => {
      console.error('Error listening to submissions:', error);
      showNotification('Error loading submissions', 'error');
    });
    
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showNotification('Login successful', 'success');
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Please try again later.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Error logging out', 'error');
    }
  };

  const loadSubmissions = async () => {
    try {
      const q = query(
        collection(db, 'subscriptions'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error loading submissions:', error);
      showNotification('Error loading submissions', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // ========================================
  // GENERATE QR CODE WITH USER DATA
  // ========================================
 const generateQRCodeWithUserData = async (submission, ticketId) => {
  try {
    // Automatically uses correct URL (localhost in dev, production URL when deployed)
    const baseUrl = window.location.origin;
    const verificationUrl = `${baseUrl}/verify?ticket=${ticketId}&name=${encodeURIComponent(submission.fullName)}&plan=${encodeURIComponent(submission.planName)}&verified=true`;

    console.log('✅ Generated verification URL:', verificationUrl);

    const qrCodeImage = await QRCode.toDataURL(verificationUrl, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#306CEC',
        light: '#FFFFFF'
      }
    });

    return qrCodeImage;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

  // ========================================
  // SEND APPROVAL EMAIL WITH QR TICKET
  // ========================================
const sendApprovalEmailWithTicket = async (submission, ticketId) => {
  try {
    console.log('Generating QR code ticket for:', submission.fullName);
    
    const qrCodeImage = await generateQRCodeWithUserData(submission, ticketId);

    if (!qrCodeImage) {
      throw new Error('Failed to generate QR code');
    }

    console.log(' QR code generated successfully');

    const templateParams = {
      to_email: submission.email,
      email_subject: 'Your Impact360 Event Ticket',
      
      // WELCOME MESSAGE
      welcome_message: `
        <div style="padding: 40px 30px; background-color: #F8F9FA; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #306CEC;">
          <h2 style="color: #306CEC; margin: 0 0 25px 0; font-size: 26px; font-weight: bold;">Welcome, ${submission.fullName}</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0 0 18px 0;">
            We're glad to have you join this experience. Your participation means you are stepping into a space built for <strong>bold conversations</strong>, <strong>practical insights</strong>, and <strong>meaningful connections</strong> that go beyond surface-level thinking.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0 0 18px 0;">
            This is more than an event. It is a room for <strong>thinkers</strong>, <strong>builders</strong>, and <strong>doers</strong> who are ready to engage, challenge ideas, and leave with clarity and direction.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
            Thank you for being part of this community. We look forward to the experience we'll create together.
          </p>
          
          <p style="color: #306CEC; font-size: 17px; font-weight: bold; margin: 0;">
            — Impact360 Team
          </p>
        </div>
      `,
      
      // TICKET WITH QR CODE
      additional_info: `
        <div style="text-align: center; padding: 50px 30px; background-color: #F0F9FF; border-radius: 15px; border: 2px solid #306CEC;">
          
          <h2 style="color: #306CEC; margin: 0 0 35px 0; font-size: 28px; font-weight: bold;">YOUR EVENT TICKET</h2>
          
          <div style="background-color: white; padding: 35px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 25px rgba(0,0,0,0.1); max-width: 420px;">
            
            <div style="margin-bottom: 30px; padding-bottom: 25px; border-bottom: 3px solid #306CEC;">
              <p style="margin: 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Attendee</p>
              <h3 style="margin: 8px 0 0 0; color: #306CEC; font-size: 26px; font-weight: bold;">${submission.fullName.toUpperCase()}</h3>
            </div>
            
            <div style="margin: 30px 0;">
              <img src="${qrCodeImage}" alt="Event Ticket QR Code" style="display: block; max-width: 320px; width: 100%; height: auto; margin: 0 auto; border: 5px solid #306CEC; border-radius: 12px; box-shadow: 0 4px 12px rgba(48, 108, 236, 0.2);" />
            </div>
            
            <div style="margin-top: 30px; padding-top: 25px; border-top: 2px dashed #DDD; text-align: left;">
              <table style="width: 100%; font-size: 15px;">
                <tr>
                  <td style="padding: 10px 0; color: #888; font-weight: bold;">Ticket ID:</td>
                  <td style="padding: 10px 0; color: #306CEC; font-weight: bold; font-family: monospace; font-size: 14px;">${ticketId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-weight: bold;">Plan:</td>
                  <td style="padding: 10px 0; color: #333; font-weight: 600;">${submission.planName} (${submission.planPeriod})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-weight: bold;">Email:</td>
                  <td style="padding: 10px 0; color: #333; word-break: break-word;">${submission.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px 0; color: #333;">${submission.phone}</td>
                </tr>
              </table>
            </div>
          </div>
          
          <div style="background-color: #FFF3CD; padding: 28px; border-radius: 12px; margin-top: 35px; text-align: left; border-left: 5px solid #FFD700;">
            <p style="margin: 0 0 18px 0; font-weight: bold; color: #856404; font-size: 17px;">📋 Event Entry Instructions</p>
            <ol style="margin: 0; padding-left: 22px; color: #856404; line-height: 2.2; font-size: 15px;">
              <li><strong>Save this email</strong> or screenshot the QR code above</li>
              <li><strong>Arrive 15 minutes early</strong> to the event venue</li>
              <li><strong>Show your QR code</strong> at the registration desk</li>
              <li><strong>Enjoy the event!</strong> Engage, learn, and connect</li>
            </ol>
          </div>
          
          <div style="margin-top: 28px; padding: 22px; background-color: #D4EDDA; border-radius: 10px; border-left: 5px solid #28a745;">
            <p style="margin: 0; color: #155724; font-size: 15px; text-align: left; line-height: 1.7;">
              <strong>📅 Event Details</strong><br>
              Date: 7th February 2026<br>
              Venue: Taidy's Nakuru<br>
              Time:From 1:30pm<br>
            </p>
          </div>
          
        </div>
      `
    };

    console.log('📧 Sending approval email to:', submission.email);
    
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_USER,
      templateParams
    );

    console.log(' Approval email with QR ticket sent successfully!');
    return true;

  } catch (error) {
    console.error('❌ Failed to send approval email:', error);
    return false;
  }
};

  // ========================================
  // SEND REJECTION EMAIL
  // ========================================
  const sendRejectionEmail = async (submission, reason) => {
    try {
      const templateParams = {
        to_email: submission.email,
        email_subject: ' Subscription Status Update - Action Required',
        email_icon: '⚠️',
        greeting: 'Status Update',
        status_message: 'Your subscription requires attention',
        user_name: submission.fullName,
        main_message: `We've reviewed your ${submission.planName} Plan subscription request. Unfortunately, we were unable to approve it at this time.`,
        plan_name: submission.planName,
        plan_period: submission.planPeriod,
        amount: submission.amount,
        mpesa_code: submission.mpesaCode,
        id_label: 'Reference ID',
        reference_id: submission.id,
        event_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        header_color: 'background-color: #F8D7DA',
        notice_color: 'background-color: #FEE',
        notice_border: '#F44',
        notice_title: '❌ Reason for Rejection',
        notice_message: reason,
        additional_info: `
          <h4 style="margin-bottom: 10px;">What You Can Do:</h4>
          <ol style="margin-top: 0;">
            <li>Verify your M-Pesa transaction details are correct</li>
            <li>Contact our support team for clarification</li>
            <li>Submit a new request with corrected information</li>
          </ol>
          <p style="margin-top: 15px;">
            <strong>Need help?</strong> Email us at support@impact360.com
          </p>
        `,
        closing_message: 'We appreciate your understanding and look forward to welcoming you to Impact360.'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_USER,
        templateParams
      );

      console.log('✅ Rejection email sent');
      return true;
    } catch (error) {
      console.error('❌ Failed to send rejection email:', error);
      return false;
    }
  };

  // ========================================
  // HANDLE APPROVE
  // ========================================
  const handleApprove = async (submission) => {
    if (!window.confirm(`Approve subscription for ${submission.fullName}?`)) {
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('🔄 Starting approval process for:', submission.fullName);
      
      const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      console.log('🎫 Generated Ticket ID:', ticketId);
      
      await updateDoc(doc(db, 'subscriptions', submission.id), {
        status: 'approved',
        approvedAt: new Date().toISOString(),
        approvedBy: currentUser.email,
        ticketId: ticketId,
        updatedAt: new Date().toISOString()
      });
      
      console.log('✅ Firestore updated - Status: Approved');
      
      const emailSent = await sendApprovalEmailWithTicket(submission, ticketId);
      
      if (emailSent) {
        showNotification(
          ` Success! Ticket sent to ${submission.fullName} at ${submission.email}`, 
          'success'
        );
        
        alert(`Approval Complete!

User: ${submission.fullName}
Email: ${submission.email}
Ticket ID: ${ticketId}

QR code ticket has been sent to the user's email.`);
      } else {
        showNotification(
          `⚠️ Approved but email failed. Ticket ID: ${ticketId}`, 
          'error'
        );
      }
      
      setSelectedSubmission(null);
      
    } catch (error) {
      console.error('❌ Error during approval:', error);
      showNotification('Error approving submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // HANDLE REJECT
  // ========================================
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showNotification('Please provide a rejection reason', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await updateDoc(doc(db, 'subscriptions', selectedSubmission.id), {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectedBy: currentUser.email,
        rejectionReason: rejectionReason,
        updatedAt: new Date().toISOString()
      });
      
      const emailSent = await sendRejectionEmail(selectedSubmission, rejectionReason);
      
      if (emailSent) {
        showNotification(' Rejected & email sent', 'success');
      } else {
        showNotification(' Rejected but email failed', 'error');
      }
      
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error rejecting submission:', error);
      showNotification('Error rejecting submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editData.fullName || !editData.email || !editData.phone) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await updateDoc(doc(db, 'subscriptions', selectedSubmission.id), {
        ...editData,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser.email
      });
      
      showNotification('Submission updated successfully', 'success');
      setShowEditModal(false);
      setSelectedSubmission(null);
      setEditData({});
    } catch (error) {
      console.error('Error updating submission:', error);
      showNotification('Error updating submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'subscriptions', selectedSubmission.id));
      showNotification('Submission deleted successfully', 'success');
      setShowDeleteModal(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error deleting submission:', error);
      showNotification('Error deleting submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (submission) => {
    setSelectedSubmission(submission);
    setEditData({
      fullName: submission.fullName,
      position: submission.position,
      email: submission.email,
      phone: submission.phone,
      mpesaCode: submission.mpesaCode,
      mpesaMessage: submission.mpesaMessage,
      amount: submission.amount
    });
    setShowEditModal(true);
  };

  const filteredSubmissions = submissions
    .filter(s => filter === 'all' || s.status === filter)
    .filter(s =>
      s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mpesaCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    total: submissions.length
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
              <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-sm sm:text-base text-gray-600">Impact360 Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="admin@impact360.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="Enter password"
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            Contact your system administrator if you need access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white flex items-center gap-2 sm:gap-3`}>
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> : <XCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />}
          <span className="text-sm sm:text-base">{notification.message}</span>
        </div>
      )}

      <div className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Impact360 Admin</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{currentUser?.email}</p>
            </div>
            
            <div className="hidden sm:flex gap-3">
              <button
                onClick={loadSubmissions}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {showMobileMenu && (
            <div className="sm:hidden mt-4 pt-4 border-t space-y-2">
              <button
                onClick={() => {
                  loadSubmissions();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <Mail className="hidden sm:block w-8 sm:w-12 h-8 sm:h-12 text-blue-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="hidden sm:block w-8 sm:w-12 h-8 sm:h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Approved</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="hidden sm:block w-8 sm:w-12 h-8 sm:h-12 text-green-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Rejected</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="hidden sm:block w-8 sm:w-12 h-8 sm:h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or M-Pesa code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected ({stats.rejected})
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({stats.total})
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{submission.fullName}</h3>
                  <p className="text-sm text-gray-600 truncate">{submission.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${
                  submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium text-gray-900">{submission.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">KES {submission.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">M-Pesa:</span>
                  <span className="font-mono text-xs text-gray-900">{submission.mpesaCode}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSubmission(submission)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                
                {submission.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(submission)}
                      disabled={loading}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors text-sm"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setShowRejectModal(true);
                      }}
                      disabled={loading}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => openEditModal(submission)}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No submissions found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">M-Pesa Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{submission.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {submission.planName}
                      <br />
                      <span className="text-xs text-gray-500">{submission.planPeriod}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{submission.mpesaCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">KES {submission.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {submission.createdAt?.toDate ? submission.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(submission)}
                              disabled={loading}
                              className="p-2 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowRejectModal(true);
                              }}
                              disabled={loading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => openEditModal(submission)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No submissions found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-bold mb-4">Reject Submission</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Please provide a reason for rejecting this submission.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 min-h-24 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={loading || !rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
              >
                {loading ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit Submission</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={editData.fullName || ''}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={editData.position || ''}
                  onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Code</label>
                <input
                  type="text"
                  value={editData.mpesaCode || ''}
                  onChange={(e) => setEditData({ ...editData, mpesaCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <input
                  type="text"
                  value={editData.amount || ''}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Message</label>
                <textarea
                  value={editData.mpesaMessage || ''}
                  onChange={(e) => setEditData({ ...editData, mpesaMessage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData({});
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-bold mb-4 text-red-600">Delete Submission</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Are you sure you want to delete the submission from <strong>{selectedSubmission?.fullName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSubmission(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSubmission && !showRejectModal && !showEditModal && !showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 my-8 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Submission Details</h3>
        <button
          onClick={() => setSelectedSubmission(null)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      
      <div className="space-y-4 text-sm sm:text-base">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-base sm:text-lg text-gray-900">{selectedSubmission.fullName}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Position</label>
            <p className="text-base sm:text-lg text-gray-900">{selectedSubmission.position || 'N/A'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Email</label>
            <p className="text-base sm:text-lg break-all text-gray-900">{selectedSubmission.email}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Phone</label>
            <p className="text-base sm:text-lg text-gray-900">{selectedSubmission.phone}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Plan</label>
            <p className="text-base sm:text-lg text-gray-900">{selectedSubmission.planName}</p>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Period</label>
            <p className="text-base sm:text-lg text-gray-900">{selectedSubmission.planPeriod}</p>
          </div>
        </div>
        
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-500">M-Pesa Transaction Code</label>
          <p className="text-base sm:text-lg font-mono bg-gray-100 p-3 rounded break-all text-gray-900">
            {selectedSubmission.mpesaCode}
          </p>
        </div>
        
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-500">Amount Paid</label>
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            KES {selectedSubmission.amount}
          </p>
        </div>
        
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-500">M-Pesa Message</label>
          <p className="text-xs sm:text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap break-words text-gray-900">
            {selectedSubmission.mpesaMessage}
          </p>
        </div>
        
        <div>
          <label className="text-xs sm:text-sm font-medium text-gray-500">Status</label>
          <p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              selectedSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              selectedSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedSubmission.status?.toUpperCase()}
            </span>
          </p>
        </div>
        
        {selectedSubmission.status === 'approved' && selectedSubmission.ticketId && (
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Ticket ID</label>
            <p className="text-base sm:text-lg font-mono bg-green-50 p-3 rounded break-all text-green-700">
              {selectedSubmission.ticketId}
            </p>
          </div>
        )}
        
        {selectedSubmission.status === 'rejected' && selectedSubmission.rejectionReason && (
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Rejection Reason</label>
            <p className="text-xs sm:text-sm bg-red-50 p-3 rounded text-red-700">
              {selectedSubmission.rejectionReason}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Submitted At</label>
            <p className="text-xs sm:text-sm text-gray-900">
              {selectedSubmission.createdAt?.toDate
                ? selectedSubmission.createdAt.toDate().toLocaleString()
                : 'N/A'}
            </p>
          </div>
          {selectedSubmission.updatedAt && (
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-500">Last Updated</label>
              <p className="text-xs sm:text-sm text-gray-900">
                {selectedSubmission.updatedAt?.toDate
                  ? selectedSubmission.updatedAt.toDate().toLocaleString()
                  : new Date(selectedSubmission.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        
        {selectedSubmission.approvedAt && (
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-500">Approved At</label>
            <p className="text-xs sm:text-sm text-green-600">
              {selectedSubmission.approvedAt?.toDate
                ? selectedSubmission.approvedAt.toDate().toLocaleString()
                : new Date(selectedSubmission.approvedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setSelectedSubmission(null)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base text-gray-700"
        >
          Close
        </button>
        {selectedSubmission.status === 'pending' && (
          <>
            <button
              onClick={() => handleApprove(selectedSubmission)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              <Check className="w-4 h-4 inline mr-2" />
              Approve
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              <X className="w-4 h-4 inline mr-2" />
              Reject
            </button>
          </>
        )}
        {selectedSubmission.status === 'rejected' && (
          <button
            onClick={() => openEditModal(selectedSubmission)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Edit className="w-4 h-4 inline mr-2" />
            Edit & Resubmit
          </button>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminDashboard;