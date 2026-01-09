// Subscription.jsx - Updated with Two-Step Process: Payment Info → Ticket Form
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, BookOpen, Users, Gift, Check, X, Loader2, Copy, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase/firebase'; 

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState({ paybill: false, account: false });
  const [ticketFormData, setTicketFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mpesaMessage: ''
  });

  const { darkMode } = useDarkMode();

  // M-Pesa Payment Details - UPDATE THESE WITH YOUR ACTUAL DETAILS
  const MPESA_PAYBILL = "400200";
  const MPESA_ACCOUNT = "1118559";

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

  // Helper function to extract M-Pesa code from message
  const extractMpesaCode = (message) => {
    const codeMatch = message.match(/\b[A-Z]{2}\d{8}\b|\b[A-Z0-9]{10}\b/);
    return codeMatch ? codeMatch[0] : 'UNKNOWN';
  };

  // Helper function to extract amount from message
  const extractAmount = (message) => {
    const amountMatch = message.match(/(?:Ksh\.?|KES\.?|)\s*([\d,]+\.?\d*)/i);
    if (amountMatch) {
      return amountMatch[1].replace(/,/g, '');
    }
    return planToSubscribe?.price.replace(/,/g, '') || '0';
  };

  const handleSubscribeClick = (plan) => {
    setPlanToSubscribe(plan);
    setShowPaymentInfo(true);
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleProceedToTicketForm = () => {
    setShowPaymentInfo(false);
    setShowTicketForm(true);
  };

  const handleTicketFormChange = (e) => {
    setTicketFormData({ ...ticketFormData, [e.target.name]: e.target.value });
  };

  const handleTicketFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const mpesaCode = extractMpesaCode(ticketFormData.mpesaMessage);
      const amount = extractAmount(ticketFormData.mpesaMessage);

      const submissionData = {
        fullName: ticketFormData.fullName,
        email: ticketFormData.email,
        phone: ticketFormData.phone,
        mpesaMessage: ticketFormData.mpesaMessage,
        mpesaCode: mpesaCode,
        amount: amount,
        planName: planToSubscribe?.name || 'General',
        planPeriod: selectedPlan,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'subscriptions'), submissionData);

      alert(`✅ Submission Successful!

Your subscription request has been received and is pending verification.

Submission ID: ${docRef.id}

What happens next:
1. Our team will verify your M-Pesa payment within 24-48 hours
2. Once approved, you'll receive your ticket with QR code via email
3. Please check your email (${ticketFormData.email}) regularly for updates

Important: Check your spam/junk folder if you don't see our email in your inbox.

Thank you for subscribing to Impact360! 🎉`);

      // Reset form
      setTicketFormData({
        fullName: '',
        email: '',
        phone: '',
        mpesaMessage: ''
      });
      setShowTicketForm(false);
      setPlanToSubscribe(null);
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`❌ Error submitting your request.

${error.message}

Please try again or contact our support team if the problem persists.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModals = () => {
    if (!isProcessing) {
      setShowPaymentInfo(false);
      setShowTicketForm(false);
      setPlanToSubscribe(null);
      setTicketFormData({
        fullName: '',
        email: '',
        phone: '',
        mpesaMessage: ''
      });
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

      {/* Payment Information Modal */}
      <AnimatePresence>
        {showPaymentInfo && planToSubscribe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg rounded-3xl shadow-2xl p-8 ${
                darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
              }`}
            >
              <button
                onClick={handleCloseModals}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <CreditCard className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} />
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  PAYMENT INFORMATION
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {planToSubscribe.name} Plan - KES {planToSubscribe.price}/{planToSubscribe.period}
                </p>
              </div>

              <div className="space-y-6 mb-8">
              

                {/* Paybill Number */}
                <div className={`p-5 rounded-2xl border-2 ${darkMode ? 'bg-black border-[#306CEC]/30' : 'bg-gray-50 border-gray-200'}`}>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    BUSINESS NUMBER (PAYBILL)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={MPESA_PAYBILL}
                      readOnly
                      className={`flex-1 px-4 py-3 rounded-xl font-bold text-2xl text-center ${
                        darkMode ? 'bg-[#1a1f3a] text-[#306CEC] border border-[#306CEC]/20' : 'bg-white text-[#306CEC] border border-gray-300'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(MPESA_PAYBILL, 'paybill')}
                      className={`p-3 rounded-xl transition-colors ${
                        darkMode ? 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white' : 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white'
                      }`}
                    >
                      {copied.paybill ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                    </motion.button>
                  </div>
                </div>

                {/* Account Number */}
                <div className={`p-5 rounded-2xl border-2 ${darkMode ? 'bg-black border-[#306CEC]/30' : 'bg-gray-50 border-gray-200'}`}>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ACCOUNT NUMBER
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={MPESA_ACCOUNT}
                      readOnly
                      className={`flex-1 px-4 py-3 rounded-xl font-bold text-2xl text-center ${
                        darkMode ? 'bg-[#1a1f3a] text-[#306CEC] border border-[#306CEC]/20' : 'bg-white text-[#306CEC] border border-gray-300'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(MPESA_ACCOUNT, 'account')}
                      className={`p-3 rounded-xl transition-colors ${
                        darkMode ? 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white' : 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white'
                      }`}
                    >
                      {copied.account ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                    </motion.button>
                  </div>
                </div>

                {/* Amount Display */}
                <div className={`p-5 rounded-2xl text-center ${darkMode ? 'bg-[#306CEC]/10 border border-[#306CEC]/30' : 'bg-green-50 border border-green-200'}`}>
                  <p className={`text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    AMOUNT TO PAY
                  </p>
                  <p className={`text-4xl font-bold ${darkMode ? 'text-[#306CEC]' : 'text-green-600'}`}>
                    KES {planToSubscribe.price}
                  </p>
                </div>
              </div>

              {/* Proceed Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToTicketForm}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]' : 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                <span>GENERATE TICKET</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Click the button above after completing your M-Pesa payment to proceed with ticket generation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket Form Modal */}
      <AnimatePresence>
        {showTicketForm && planToSubscribe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModals}
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
                onClick={handleCloseModals}
                disabled={isProcessing}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <Ticket className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} />
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  GENERATE YOUR TICKET
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {planToSubscribe.name} Plan - KES {planToSubscribe.price}/{planToSubscribe.period}
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
            {/* Email */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                EMAIL ADDRESS *
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
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Your ticket will be sent to this email
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                PHONE NUMBER *
              </label>
              <input
                type="tel"
                name="phone"
                value={ticketFormData.phone}
                onChange={handleTicketFormChange}
                required
                disabled={isProcessing}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  darkMode 
                    ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="+254 XXX XXX XXX"
              />
            </div>

            {/* M-Pesa Message */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                M-PESA CONFIRMATION MESSAGE *
              </label>
              <textarea
                name="mpesaMessage"
                value={ticketFormData.mpesaMessage}
                onChange={handleTicketFormChange}
                required
                disabled={isProcessing}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
                  darkMode 
                    ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Paste your complete M-Pesa SMS here&#10;&#10;Example:&#10;SH12345678 Confirmed. Ksh2,099.00 sent to IMPACT360 for account 522533 on 9/1/26 at 2:30 PM. New M-Pesa balance is Ksh5,000.00..."
              />
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                📱 Copy and paste the <strong>complete M-Pesa confirmation SMS</strong> you received after payment
              </p>
            </div>

            {/* Important Notice */}
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>
                ⚠️ IMPORTANT NOTICE
              </p>
              <ul className={`text-xs space-y-1 list-disc list-inside ${darkMode ? 'text-yellow-400/80' : 'text-yellow-600'}`}>
                <li>Your ticket will be sent to your email after payment verification</li>
                <li>Verification usually takes 24-48 hours</li>
                <li>Check your spam/junk folder if you don't see our email</li>
                <li>Keep your M-Pesa confirmation message safe</li>
              </ul>
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
                'SUBMIT & GENERATE TICKET'
              )}
            </motion.button>

            <p className={`text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              By submitting, you agree that all information provided is accurate
            </p>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Post-Event Experiences Section */}
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
            <span className="text-2xl">🎉</span>
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