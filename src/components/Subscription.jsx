import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, BookOpen, Users, Gift, Check, X, Loader2 } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [manualPaymentMode, setManualPaymentMode] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketFormData, setTicketFormData] = useState({
    fullName: '',
    position: '',
    email: '',
    paymentConfirmation: ''
  });

  const { darkMode } = useDarkMode();

  const subscriptionPlans = {
    monthly: [
      { name: "Student", price: "999", period: "mo", features: ["1 event access", "slides", "resource pack"] },
      { name: "Pro", price: "2,099", period: "mo", features: ["Access to event", "networking zone", "digital resources"], popular: true },
      { name: "Premium", price: "4,099", period: "mo", features: ["VIP seating", "spotlight networking", "partner invites"] }
    ],
    quarterly: [
      { name: "Student", price: "2,847", period: "3mo", features: ["3 sessions + replays", "1 free guest pass per quarter"], save: "150" },
      { name: "Pro", price: "5,982", period: "3mo", features: ["3 sessions", "1 VIP mixer invite", "priority entry"], save: "315", popular: true },
      { name: "Premium", price: "11,682", period: "3mo", features: ["Exclusive roundtable access", "event recordings"], save: "615" }
    ],
    biannual: [
      { name: "Student", price: "5,395", period: "6mo", features: ["6 sessions", "certificate of participation", "growth toolkit"], save: "599" },
      { name: "Pro", price: "11,335", period: "6mo", features: ["6 sessions", "full replay access", "community membership"], save: "1,259", popular: true },
      { name: "Premium", price: "22,135", period: "6mo", features: ["Mastermind dinner", "recognition certificate", "all replays"], save: "2,459" }
    ],
    annual: [
      { name: "Student", price: "10,189", period: "yr", features: ["12 sessions", "all replays", "invite to Student Impact Summit"], save: "1,799" },
      { name: "Pro", price: "21,410", period: "yr", features: ["12 sessions", "partner discounts", "Impact360 T-shirt"], save: "3,778", popular: true },
      { name: "Premium", price: "41,810", period: "yr", features: ["All-access", "private dinner", "media spotlight", "merch pack"], save: "7,378" }
    ]
  };

  const benefits = [
    { Icon: Ticket, title: "Event Access", description: "Priority access to all our workshops, masterclasses, and networking events" },
    { Icon: BookOpen, title: "Resources", description: "Get slides, toolkits, templates, and exclusive materials from every session" },
    { Icon: Users, title: "Community", description: "Connect with fellow entrepreneurs, mentors, and industry leaders" },
    { Icon: Gift, title: "Perks", description: "Enjoy discounts, merch, certificates, and special recognition opportunities" }
  ];

  const handleSubscribeClick = (plan) => {
    setPlanToSubscribe(plan);
    setServerError(null);
    setShowForm(true);
    setShowTicketForm(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTicketFormChange = (e) => {
    setTicketFormData({ ...ticketFormData, [e.target.name]: e.target.value });
  };

  const handleGenerateTicket = () => {
    setShowTicketForm(true);
  };

  const handleTicketFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Here you can add your API call to submit the ticket form data
    console.log('Ticket form submitted:', {
      plan: planToSubscribe,
      period: selectedPlan,
      ...ticketFormData
    });
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowForm(false);
      setShowTicketForm(false);
      setTicketFormData({
        fullName: '',
        position: '',
        email: '',
        paymentConfirmation: ''
      });
      alert('Ticket request submitted successfully! We will verify your payment and send your ticket via email.');
    }, 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setIsProcessing(true);
    
    try {
      let apiUrl = 'http://localhost:3001';
      try {
        apiUrl = import.meta?.env?.FRONTEND_URL || process?.env?.REACT_APP_API_URL || window?.__API_URL__ || apiUrl;
      } catch (innerErr) {
        // ignore and keep default apiUrl
      }
      
      const response = await fetch(`${apiUrl}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planToSubscribe.name,
          amount: planToSubscribe.price.replace(/,/g, ''),
          period: selectedPlan,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email
        })
      });
      
      const data = await response.json();
      console.log('Payment response status:', response.status, data);
      
      if (response.ok && data.success) {
        setServerError(null);
        if (data.data.order_tracking_id) {
          localStorage.setItem('pendingOrderId', data.data.order_tracking_id);
          localStorage.setItem('pendingMerchantRef', data.data.merchant_reference);
          localStorage.setItem('pendingPlan', JSON.stringify({
            name: planToSubscribe.name,
            amount: planToSubscribe.price,
            period: selectedPlan
          }));
        }
        
        if (data.data.redirect_url) {
          window.location.href = data.data.redirect_url;
        } else {
          setServerError('Payment URL not received from server.');
          setIsProcessing(false);
        }
      } else {
        const msg = data?.message || 'Payment failed';
        const detail = data?.error ? ` — ${data.error}` : '';
        setServerError(`${msg}${detail}`);
        console.error('Create-payment failed:', response.status, data);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setServerError(err.message || 'Network error. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={`transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      
      {/* Header Section */}
      <section className={`relative pt-32 pb-16 px-6 overflow-hidden transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]'}`}>
        <motion.div 
          className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-[#306CEC]' : 'text-white'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              SUBSCRIPTION PLANS
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>
              Choose the perfect plan to accelerate your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan Period Selector */}
      <section className={`py-16 px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }} 
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'quarterly', label: 'Quarterly' },
              { key: 'biannual', label: 'Bi-Annual' },
              { key: 'annual', label: 'Annual' }
            ].map((plan) => (
              <motion.button 
                key={plan.key} 
                onClick={() => setSelectedPlan(plan.key)} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  selectedPlan === plan.key
                    ? darkMode
                      ? 'bg-[#306CEC] text-white shadow-xl'
                      : 'bg-[#306CEC] text-white shadow-xl'
                    : darkMode
                    ? 'bg-[#1a1f3a] text-gray-300 hover:bg-[#252b47] shadow-lg border border-[#306CEC]/20'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {plan.label.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans[selectedPlan].map((plan, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.6 }} 
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.05 }}
                className={`relative rounded-3xl p-8 shadow-2xl flex flex-col transition-colors duration-1000 ${
                  plan.popular
                    ? darkMode
                      ? 'bg-black border-2 border-[#306CEC] text-white'
                      : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] text-white scale-105'
                    : darkMode
                    ? 'bg-black border border-[#306CEC]/20 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold mb-4 ${plan.popular ? darkMode ? 'text-[#306CEC]' : 'text-white' : darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {plan.name.toUpperCase()}
                  </h3>
                  {plan.save && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-4">
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        darkMode ? 'bg-[#306CEC]/20 text-[#306CEC] border border-[#306CEC]/30' : plan.popular ? 'bg-yellow-400 text-gray-900' : 'bg-green-100 text-green-700'
                      }`}>
                        Save KES. {plan.save}
                      </div>
                    </motion.div>
                  )}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-lg">KES.</span>
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-lg">/{plan.period}</span>
                  </div>
                  <div className={`text-sm mt-3 ${plan.popular ? darkMode ? 'text-gray-400' : 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Subscription
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      transition={{ delay: 0.6 + i * 0.1 }} 
                      viewport={{ once: true }} 
                      className="flex items-start gap-3"
                    >
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? darkMode ? 'text-[#306CEC]' : 'text-yellow-300' : darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={2.5} />
                      <span className={`${darkMode ? 'text-gray-300' : plan.popular ? 'text-white/90' : 'text-gray-600'}`}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribeClick(plan)}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                    darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]' : plan.popular ? 'bg-white text-[#306CEC] hover:bg-gray-100' : 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]'
                  }`}
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  SUBSCRIBE NOW
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form Modal */}
      <AnimatePresence>
        {showForm && planToSubscribe && (
          manualPaymentMode ? (
            showTicketForm ? (
              /* --- Ticket Generation Form --- */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => !isProcessing && setShowTicketForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`relative w-full max-w-md rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto ${
                    darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                  }`}
                >
                  <button
                    onClick={() => !isProcessing && setShowTicketForm(false)}
                    disabled={isProcessing}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      GENERATE TICKET
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Complete the form below to receive your ticket
                    </p>
                  </div>

                  <form onSubmit={handleTicketFormSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={ticketFormData.fullName}
                        onChange={handleTicketFormChange}
                        required
                        disabled={isProcessing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                          darkMode 
                            ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Position/Occupation */}
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        POSITION/OCCUPATION *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={ticketFormData.position}
                        onChange={handleTicketFormChange}
                        required
                        disabled={isProcessing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                          darkMode 
                            ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="e.g., Student, Entrepreneur, CEO"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={ticketFormData.email}
                        onChange={handleTicketFormChange}
                        required
                        disabled={isProcessing}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                          darkMode 
                            ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Payment Confirmation */}
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        PAYMENT CONFIRMATION *
                      </label>
                      <textarea
                        name="paymentConfirmation"
                        value={ticketFormData.paymentConfirmation}
                        onChange={handleTicketFormChange}
                        required
                        disabled={isProcessing}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
                          darkMode 
                            ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="Paste your M-Pesa or bank confirmation message here..."
                      />
                      <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Include the transaction code, amount, and date
                      </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
                        darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]' : 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]'
                      } ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                      style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          PROCESSING...
                        </span>
                      ) : (
                        'SUBMIT & GET TICKET'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            ) : (
              /* --- Manual Payment Instructions Modal --- */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`relative w-full max-w-md rounded-3xl shadow-2xl p-8 ${
                    darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                  }`}
                >
                  <button
                    onClick={() => setShowForm(false)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {planToSubscribe?.name.toUpperCase()} PLAN
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Complete payment to activate your subscription
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Amount */}
                    <div className={`p-6 rounded-2xl text-center ${darkMode ? 'bg-black border border-[#306CEC]/20' : 'bg-gray-50'}`}>
                      <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        AMOUNT TO PAY
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>KES.</span>
                        <span className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {planToSubscribe?.price}
                        </span>
                      </div>
                    </div>

                    {/* Paybill Number */}
                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-black border border-[#306CEC]/20' : 'bg-gray-50'}`}>
                      <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        PAYBILL NUMBER
                      </p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        400200
                      </p>
                    </div>

                    {/* Account Number */}
                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-black border border-[#306CEC]/20' : 'bg-gray-50'}`}>
                      <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        ACCOUNT NUMBER
                      </p>
                      <p className={`text-3xl font-bold ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        1118559
                      </p>
                    </div>

                    {/* Generate Ticket Button */}
                    <motion.button
                      onClick={handleGenerateTicket}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                        darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]' : 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]'
                      }`}
                      style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                      GENERATE TICKET
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )
          ) : (
            /* --- Original Pesapal Payment Form --- */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => !isProcessing && setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md rounded-3xl shadow-2xl p-8 ${
                  darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                }`}
              >
                {/* Keep your existing Pesapal form here */}
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>


      {/* Post-Event Experiences */}
      <section className={`py-16 px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden transition-colors duration-1000 ${
              darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]'
            }`}
          >
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}></div>
            <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}></div>
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 border ${
                  darkMode ? 'bg-[#306CEC]/20 border-[#306CEC]/30' : 'bg-white/20 border-white/30'
                }`}
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Optional Add-On
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-extrabold mb-6 ${darkMode ? 'text-[#306CEC]' : 'text-white'}`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                EXTEND YOUR EXPERIENCE
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-xl mb-4 max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-white/90'}`}
              >
                Don't rush home after the event! Join us for optional leisure activities — unwind, explore scenic locations, and build deeper connections in a relaxed setting.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-white/70'}`}
              >
                🌟 Unique experiences for each city • Separate booking & pricing
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border-2 ${
                  darkMode ? 'bg-[#306CEC]/20 border-[#306CEC]/30' : 'bg-white/20 border-white/30'
                }`}
              >
                <span className="text-2xl">✨</span>
                Details Coming Soon
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#F5F5F0]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              WHY SUBSCRIBE?
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get exclusive access to events, resources, and a thriving community
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.Icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.1, duration: 0.6 }} 
                  viewport={{ once: true }} 
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
                    darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                  }`}
                >
                  <IconComponent className={`w-14 h-14 mx-auto mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {benefit.title.toUpperCase()}
                  </h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </motion.div>
          <div className="space-y-6">
            {[
              {
                question: "Can I upgrade my plan later?",
                answer: "Yes! You can upgrade your subscription at any time and we'll prorate the difference."
              },
              {
                question: "What happens if I miss an event?",
                answer: "Most plans include replay access, so you can watch recorded sessions at your convenience."
              },
              {
                question: "Are there refunds available?",
                answer: "We offer a 7-day money-back guarantee if you're not satisfied with your subscription."
              },
              {
                question: "Can I bring guests to events?",
                answer: "Student and Pro quarterly plans include guest passes. Premium plans offer additional guest invites."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl shadow-lg transition-colors duration-1000 ${
                  darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {faq.question.toUpperCase()}
                </h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}