// Subscription.jsx - Fully Responsive Version
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { Ticket, BookOpen, Users, Gift, Check, X, Loader2, Copy, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/firebase';
import emailjs from '@emailjs/browser';

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const TEMPLATE_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER;
const TEMPLATE_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN;
//const ADMIN_EMAIL = 'Impact360.i3@gmail.com';

const membershipBenefits = {
  Student: [
    "Access to Impact360 community (students & early builders)",
    "Free or discounted entry to Impact360 events, roadshows & webinars",
    "Foundational workshops on:\n- Entrepreneurship basics\n- Tech & digital skills awareness\n- Productivity & execution fundamentals",
    "Access to startup resources & learning materials",
    "Exposure to local startup stories & role models",
    "Certificate of participation for programs attended",
    "Priority access to internships, volunteering & community projects",
    "*Outcome:* Clarity, exposure, skills awareness, and a strong foundation early."
  ],
  Pro: [
    "Everything in Student Membership, plus:",
    "Access to founder-only & professional community",
    "Curated masterclasses (business, tech, AI, finance, growth)",
    "Business tools & templates:\n- Business models\n- Pitch decks\n- Go-to-market frameworks",
    "Monthly expert sessions (legal, tech, finance, marketing)",
    "Pitch opportunities at Impact360 demo days & partner events",
    "Visibility within the Impact360 ecosystem (startups, partners, talent)",
    "Discounts on consulting, programs & ecosystem services",
    "Priority consideration for:\n- Grants & funding opportunities\n- Startup programs & accelerators",
    "*Outcome:* Execution, traction, credibility, and ecosystem access."
  ],
  Premium: [
    "Everything in Pro Membership, plus:",
    "Direct mentorship & advisory access (1:1 or small groups)",
    "Personalized business & growth support:\n- Strategy\n- Tech integration\n- Scaling & operations",
    "Investor & partner warm introductions (where applicable)",
    "Access to closed-door roundtables with founders, investors & policymakers",
    "Priority access to Impact360 consulting services",
    "Brand & startup visibility:\n- Showcasing across Impact360 platforms\n- Speaking & thought leadership opportunities",
    "Early access to new programs, pilots & ecosystem initiatives",
    "Dedicated support for:\n- Fundraising readiness\n- Market expansion\n- Institutional & corporate partnerships",
    "*Outcome:* Scale, capital readiness, influence, and long-term growth."
  ]
};

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('tickets');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState({ paybill: false, account: false });
  const [expandedPlans, setExpandedPlans] = useState({}); // NEW: Track expanded plans
  const [ticketFormData, setTicketFormData] = useState({
    fullName: '',
    city: '',
    email: '',
    phone: '',
    mpesaMessage: ''
  });
  const [subscriptionType, setSubscriptionType] = useState('Events');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const { darkMode } = useDarkMode();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // M-Pesa Payment Details
  const MPESA_PAYBILL = "400200";
  const MPESA_ACCOUNT = "1118559";

  const subscriptionPlans = {
    tickets: [
      { name: "Student", price: "599", period: "ticket", features: [
        "Access to 1 Impact360 event",
        "Valid student ID required at entry",
        "Access to all sessions & workshops",
        "Networking with founders & speakers"
      ] },
      { name: "Standard", price: "1,199", period: "ticket", features: [
        "Access to 1 Impact360 event",
        "Access to all sessions & workshops",
        "Networking with founders & speakers",
        "Event swag & materials"
      ], popular: true }
    ],
    spotlight: [
      { name: "Student", price: "999", period: "mo", features: ["1 event access"] },
      { name: "Pro", price: "1,899", period: "mo", features: ["1 event access"], popular: true },
      { name: "Premium", price: "4,099", period: "mo", features: ["1 event access"] }
    ],
    momentum: [
      { name: "Student", price: "2,847", period: "3mo", features: ["3 sessions"], save: "150" },
      { name: "Pro", price: "5,982", period: "3mo", features: ["3 sessions"], save: "315", popular: true },
      { name: "Premium", price: "11,682", period: "3mo", features: ["3 sessions"], save: "615" }
    ],
    mastery: [
      { name: "Student", price: "5,395", period: "6mo", features: ["6 sessions"], save: "599" },
      { name: "Pro", price: "11,335", period: "6mo", features: ["6 sessions"], save: "1,259", popular: true },
      { name: "Premium", price: "22,135", period: "6mo", features: ["6 sessions"], save: "2,459" }
    ],
    membership: [
      { name: "Student", price: "10,189", period: "yr", features: [
        "Access to Impact360 community (students & early builders)",
        "Free or discounted entry to Impact360 events, roadshows & webinars",
        "Foundational workshops on entrepreneurship, tech & digital skills",
        "Access to startup resources & learning materials",
        "Exposure to local startup stories & role models",
        "Priority access to internships, volunteering & community projects"
      ], save: "1,799" },
      { name: "Pro", price: "21,410", period: "yr", features: [
        "Everything in Student Membership, plus:",
        "Access to founder-only & professional community",
        "Curated masterclasses (business, tech, AI, finance, growth)",
        "Business tools & templates (Business models, Pitch decks, Go-to-market frameworks)",
        "Monthly expert sessions (legal, tech, finance, marketing)",
        "Pitch opportunities at Impact360 demo days & partner events",
        "Visibility within the Impact360 ecosystem (startups, partners, talent)",
        "Discounts on consulting, programs & ecosystem services",
        "Priority consideration for grants & funding opportunities"
      ], save: "3,778", popular: true },
      { name: "Premium", price: "41,810", period: "yr", features: [
        "Everything in Pro Membership, plus:",
        "Direct mentorship & advisory access (1:1 or small groups)",
        "Personalized business & growth support (Strategy, Tech integration, Scaling & operations)",
        "Investor & partner warm introductions (where applicable)",
        "Access to closed-door roundtables with founders, investors & policymakers",
        "Priority access to Impact360 consulting services",
        "Brand & startup visibility (Showcasing across platforms, Speaking opportunities)",
        "Early access to new programs, pilots & ecosystem initiatives",
        "Dedicated support for fundraising readiness, market expansion & corporate partnerships"
      ], save: "7,378" }
    ]
  };

  const extractMpesaCode = (message) => {
    const codeMatch = message.match(/\b[A-Z]{2}\d{8}\b|\b[A-Z0-9]{10}\b/);
    return codeMatch ? codeMatch[0] : 'UNKNOWN';
  };

  const extractAmount = (message) => {
  // Try to match common M-Pesa amount patterns
  // Matches: "Ksh2,099.00", "KES 2099", "2,099.00 sent", etc.
  const patterns = [
    /(?:Ksh\.?|KES\.?)\s*([\d,]+\.?\d*)/i,  // Ksh2,099.00 or KES 2099
    /([\d,]+\.?\d*)\s*(?:sent|paid|to)/i,   // 2,099.00 sent to...
    /confirmed[.\s]+(?:Ksh\.?|KES\.?)?\s*([\d,]+\.?\d*)/i  // Confirmed. Ksh2,099.00
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      const amount = match[1].replace(/,/g, '');
      // Validate it's a reasonable amount (more than 100 KES)
      if (parseFloat(amount) >= 100) {
        return amount;
      }
    }
  }
  
  // Fallback to plan price if no valid amount found
  return planToSubscribe?.price.replace(/,/g, '') || '0';
};

  // ========================================
  // SEND USER CONFIRMATION EMAIL
  // ========================================
  const sendUserConfirmationEmail = async (formData, submissionId) => {
    try {
      const templateParams = {
        to_email: formData.email,
        email_subject: '📩 Subscription Received - Pending Verification',
        email_icon: '📩',
        greeting: 'Submission Received',
        status_message: 'Your subscription is pending verification',
        user_name: formData.fullName,
        main_message: `Thank you for subscribing to Impact360! We've received your ${planToSubscribe?.name} Plan subscription and are currently verifying your payment.`,
        plan_name: planToSubscribe?.name || 'General',
        plan_period: selectedPlan,
        amount: extractAmount(formData.mpesaMessage),
        mpesa_code: extractMpesaCode(formData.mpesaMessage),
        id_label: 'Submission ID',
        reference_id: submissionId,
        // NEW: Add subscriptionType to email params
        subscription_type: subscriptionType,
        event_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        header_color: 'background-color: #E7F3FF',
        notice_color: 'background-color: #FFF3CD',
        notice_border: '#FFD700',
        notice_title: '⏰ What Happens Next?',
        notice_message: 'Our team will verify your M-Pesa payment within 24-48 hours. Once approved, you\'ll receive your event ticket with a QR code via email.',
        additional_info: `
          <h3 style="margin-bottom: 10px;">Thank you . Our team will verify your M-Pesa payment within 24-48 hours. Once approved, you'll receive your event ticket with a QR code via email.</h3>
          <h4 style="margin-bottom: 10px;">Important Reminders:</h4>
          <ul style="margin-top: 0;">
            <li>Check your email regularly (including spam/junk folder)</li>
            <li>Keep your M-Pesa confirmation message safe</li>
            <li>Contact support if you have any questions</li>
          </ul>
        `,
        closing_message: 'We appreciate your patience and look forward to welcoming you to our event!'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_USER,
        templateParams
      );
      console.log('✅ User confirmation email sent');
      return true;
    } catch (error) {
      console.error('❌ Failed to send user confirmation:', error);
      return false;
    }
  };

  // ========================================
  // SEND ADMIN NOTIFICATION EMAIL
  // ========================================
  const sendAdminNotificationEmail = async (formData, submissionId) => {
    try {
      const templateParams = {
        user_name: formData.fullName,
        user_email: formData.email,
        user_phone: formData.phone,
        plan_name: planToSubscribe?.name || 'General',
        plan_period: selectedPlan,
        amount: extractAmount(formData.mpesaMessage),
        mpesa_code: extractMpesaCode(formData.mpesaMessage),
        submission_id: submissionId,
        submission_date: new Date().toLocaleString(),
        // NEW: Add subscriptionType to admin email
        subscription_type: subscriptionType,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATE_ADMIN,
        templateParams
      );
      console.log('✅ Admin notification sent');
      return true;
    } catch (error) {
      console.error('❌ Failed to send admin notification:', error);
      return false;
    }
  };

  // Show type selector modal when subscribe is clicked
  const handleSubscribeClick = (plan) => {
    if (selectedPlan === 'membership') {
      setSubscriptionType('Membership');
      setPlanToSubscribe(plan);
      setShowPaymentInfo(true);
    } else {
      setPendingPlan(plan);
      setSubscriptionType('Events');
      setPlanToSubscribe(plan);
      setShowPaymentInfo(true);
    }
  };

  // When user picks Event or Membership in modal
  const handleTypeSelect = (type) => {
    setSubscriptionType(type);
    setPlanToSubscribe(pendingPlan);
    setShowTypeSelector(false);
    if (type === 'Events') {
      setShowPaymentInfo(true);
    }
    // For Membership, just show the benefits modal (handled below)
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

  // NEW: Toggle plan expansion
  const togglePlanExpansion = (planKey) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planKey]: !prev[planKey]
    }));
  };

  // ========================================
  // HANDLE TICKET FORM SUBMIT
  // ========================================
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
        city: ticketFormData.city,
        mpesaMessage: ticketFormData.mpesaMessage,
        mpesaCode: mpesaCode,
        amount: amount,
        planName: planToSubscribe?.name || 'General',
        planPeriod: selectedPlan,
        status: 'pending',
        createdAt: serverTimestamp(),
        subscriptionType: subscriptionType,
        type: subscriptionType && subscriptionType.toLowerCase() === 'events' ? 'event' : 'membership',
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'subscriptions'), submissionData);
      console.log('✅ Saved to Firestore:', docRef.id);
      
      // Send emails in parallel
      const [userEmailSent, adminEmailSent] = await Promise.all([
        sendUserConfirmationEmail(ticketFormData, docRef.id),
        sendAdminNotificationEmail(ticketFormData, docRef.id)
      ]);

      // Show success message
      let message = ` Submission Successful!\n\n`;
      message += `Your subscription request has been received.\n\n`;
      message += `Submission ID: ${docRef.id}\n\n`;
      
      if (userEmailSent) {
        message += `📧 Confirmation email sent to ${ticketFormData.email}\n\n`;
      } else {
        message += `⚠️ Note: Confirmation email failed, but your submission was recorded.\n\n`;
      }

      if (adminEmailSent) {
        message += ` Admin has been notified\n\n`;
      }

      message += `Our team will verify your payment within 24-48 hours.\n`;
      message += `Check your email regularly for updates.\n\n`;
      message += `Thank you for subscribing to Impact360! 🎉`;

      alert(message);

      // Reset form
      setTicketFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        mpesaMessage: ''
      });
      setShowTicketForm(false);
      setPlanToSubscribe(null);
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`❌ Error submitting your request.\n\n${error.message}\n\nPlease try again or contact support.`);
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

  // Membership Benefits Modal
  const MembershipBenefitsModal = ({ plan, onClose, onContinue }) => {
    const benefits = membershipBenefits[plan.name] || [];
    // Brand colors for light and dark mode
    const planColors = {
      Student: 'bg-white text-[#306CEC] border-[#306CEC]/20 dark:bg-[#181c2a] dark:text-[#306CEC]',
      Pro: 'bg-white text-[#306CEC] border-[#306CEC]/20 dark:bg-[#181c2a] dark:text-[#306CEC]',
      Premium: 'bg-white text-[#306CEC] border-[#306CEC]/20 dark:bg-[#181c2a] dark:text-[#306CEC]'
    };
    const planIcons = {
      Student: <Users className="w-8 h-8 text-[#306CEC]" />,
      Pro: <Users className="w-8 h-8 text-[#306CEC]" />,
      Premium: <Users className="w-8 h-8 text-yellow-500" />
    };
    const planTitles = {
      Student: " Student Membership",
      Pro: " Pro Membership",
      Premium: " Premium Membership"
    };
    const planSubtitles = {
      Student: "For students & early-stage learners.",
      Pro: "For founders, freelancers, and startups.",
      Premium: "For scale-ups, corporates, and leaders."
    };
    const price = plan.price;
    const period = plan.period;

    const [showAll, setShowAll] = React.useState(false);
    const visibleBenefits = showAll ? benefits : benefits.filter(b => !b.startsWith("*Outcome:*")).slice(0, 4);
    const hasMore = benefits.filter(b => !b.startsWith("*Outcome:*")).length > 4;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-[#181c2a] border border-[#306CEC]/20 p-0"
        >
          {/* Header */}
          <div className={`rounded-t-2xl px-6 py-5 flex flex-col items-center ${planColors[plan.name]} border-b`}>
            <div>{planIcons[plan.name]}</div>
            <h3 className="text-xl font-bold mt-2 mb-1 text-[#306CEC] dark:text-[#306CEC]">{planTitles[plan.name]}</h3>
            <div className="text-xs text-center mb-1 text-gray-500 dark:text-gray-400">{planSubtitles[plan.name]}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-bold text-[#306CEC] dark:text-[#306CEC]">KES {price}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">/ {period}</span>
            </div>
          </div>
          {/* Benefits */}
          <div className="px-6 py-5">
            <div className="mb-2 font-bold text-[#306CEC] dark:text-[#306CEC] text-sm">Key Benefits</div>
            <ul className="space-y-2">
              {visibleBenefits.map((b, i) =>
                <li key={i} className="flex items-start gap-2">
                  <Check className={`w-4 h-4 flex-shrink-0 mt-1 ${plan.name === "Premium" ? "text-yellow-500" : "text-[#306CEC]"}`} />
                  <span className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">{b.replace(/\n/g, ' ')}</span>
                </li>
              )}
            </ul>
            {hasMore && !showAll && (
              <button
                className="text-xs text-[#306CEC] dark:text-[#306CEC] mt-2 underline"
                onClick={() => setShowAll(true)}
              >Show all benefits</button>
            )}
            {showAll && (
              <button
                className="text-xs text-gray-400 dark:text-gray-500 mt-2 underline"
                onClick={() => setShowAll(false)}
              >Show less</button>
            )}
            {/* Outcome */}
            {benefits.find(b => b.startsWith("*Outcome:*")) && (
              <div className="mt-4 rounded bg-[#306CEC]/10 dark:bg-[#306CEC]/20 px-3 py-2 text-[#306CEC] dark:text-[#306CEC] font-semibold text-xs">
                {benefits.find(b => b.startsWith("*Outcome:*")).replace("*Outcome:*", "Outcome:")}
              </div>
            )}
          </div>
          {/* Actions */}
          <div className="flex gap-2 px-6 pb-5">
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2 rounded-full bg-[#306CEC] text-white font-bold hover:bg-[#1a4d9e] transition text-sm"
            >
              Continue to Payment
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#232a3d] text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-[#23325a] transition text-sm"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#306CEC]/20 text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const faqs = [
    { question: "How do I get my ticket after payment?", answer: "After submitting your M-Pesa confirmation, our team verifies your payment within 24–48 hours and sends your QR-code ticket directly to your email." },
    { question: "Can I upgrade my membership tier later?", answer: "Yes — you can upgrade at any time and we'll prorate the difference for the remaining period." },
    { question: "Is student pricing available for membership too?", answer: "Absolutely. The Student membership tier is designed for students and early-stage learners at a reduced annual rate." },
    { question: "What happens if I miss an event?", answer: "Ticket holders can transfer their ticket to a future event within the same year, subject to availability." },
    { question: "Are there group or corporate rates?", answer: "Yes. Contact us directly for group bookings of 5+ tickets or corporate membership packages." },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${darkMode ? 'bg-[#080808]' : 'bg-[#f0ede6]'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      {/* ─── PLAN SELECTOR + CONTENT ─── */}
      <section className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Compact page header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-center mb-10">
            <span className={`inline-flex items-center gap-2 text-[#306CEC] text-xs font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full border mb-5 ${darkMode ? 'border-[#306CEC]/25 bg-[#306CEC]/8' : 'border-[#306CEC]/25 bg-[#306CEC]/6'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#306CEC] animate-pulse" />
              Impact360 · 2026 Access
            </span>
            <h1 className={`font-black leading-tight tracking-tight mb-3 ${darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'League Spartan, sans-serif' }}>
              SECURE YOUR <span className="text-[#306CEC]">ACCESS.</span>
            </h1>
            <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Join Kenya's boldest community of founders and builders.
            </p>
          </motion.div>

          {/* Pill toggle */}
          <div className="flex justify-center mb-10">
            <div className={`inline-flex p-1.5 rounded-full ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/8'}`}>
              {[{ key: 'tickets', label: 'Event Tickets' }, { key: 'membership', label: 'Membership' }].map(tab => (
                <motion.button key={tab.key} onClick={() => setSelectedPlan(tab.key)} whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full font-black text-sm tracking-wide transition-all duration-300 ${
                    selectedPlan === tab.key
                      ? 'bg-[#306CEC] text-white shadow-md shadow-[#306CEC]/30'
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {tab.label.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── TICKETS: full-width horizontal rows ── */}
            {selectedPlan === 'tickets' && (
              <motion.div key="t" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
                <div className="space-y-4">
                  {subscriptionPlans.tickets.map((plan, i) => (
                    <motion.div key={plan.name}
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.5 }}
                      whileHover={{ x: 6 }}
                      onClick={() => handleSubscribeClick(plan)}
                      className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 md:p-9 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        plan.popular
                          ? 'bg-[#306CEC] border-[#306CEC]'
                          : darkMode
                          ? 'bg-white/[0.03] border-white/8 hover:border-[#306CEC]/50 hover:bg-[#306CEC]/5'
                          : 'bg-white border-gray-200 hover:border-[#306CEC]/40 hover:shadow-xl'
                      }`}>
                      {/* Left */}
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${plan.popular ? 'bg-white/20' : darkMode ? 'bg-white/6' : 'bg-[#306CEC]/8'}`}>
                          <Ticket className={`w-7 h-7 ${plan.popular ? 'text-white' : 'text-[#306CEC]'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className={`font-black text-2xl md:text-3xl leading-none ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
                              style={{ fontFamily: 'League Spartan, sans-serif' }}>
                              {plan.name.toUpperCase()}
                            </h3>
                            {plan.popular && <span className="text-[10px] font-black bg-white/20 text-white px-2.5 py-1 rounded-full tracking-widest">POPULAR</span>}
                          </div>
                          <p className={`text-xs mt-1 tracking-wide ${plan.popular ? 'text-white/60' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Single event · Admit one
                          </p>
                        </div>
                      </div>
                      {/* Center: price */}
                      <div className="sm:text-center">
                        <p className={`text-[10px] tracking-[0.2em] uppercase mb-1 ${plan.popular ? 'text-white/50' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Price</p>
                        <p className={`font-black leading-none ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
                          style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'League Spartan, sans-serif' }}>
                          KES {plan.price}
                        </p>
                      </div>
                      {/* Right: CTA */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={e => { e.stopPropagation(); handleSubscribeClick(plan); }}
                        className={`px-7 py-3.5 rounded-xl font-black text-sm tracking-wider transition-all shrink-0 ${
                          plan.popular ? 'bg-white text-[#306CEC] hover:bg-gray-50' : 'bg-[#306CEC] text-white hover:bg-[#2558d4]'
                        }`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        GET TICKET →
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Ticket note */}
                <p className={`mt-6 text-xs text-center tracking-wide ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  One ticket = one event. Valid for a single Impact360 event of your choice.
                </p>
              </motion.div>
            )}

            {/* ── MEMBERSHIP ── */}
            {selectedPlan === 'membership' && (
              <motion.div key="m" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                  {subscriptionPlans.membership.map((plan, index) => {
                    const planKey = `membership-${plan.name}-${index}`;
                    const isExpanded = expandedPlans[planKey] === true;
                    const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 3);
                    const hasMore = plan.features.length > 3;
                    return (
                      <motion.div key={planKey}
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className={`relative rounded-2xl p-7 flex flex-col transition-all ${
                          plan.popular
                            ? 'bg-[#306CEC] shadow-xl shadow-[#306CEC]/20'
                            : darkMode ? 'bg-white/[0.04] border border-white/8 hover:border-white/18' : 'bg-white border border-gray-150 hover:border-[#306CEC]/25 shadow-sm hover:shadow-md'
                        }`}>
                        {plan.popular && (
                          <span className="absolute -top-3 left-6 text-[10px] font-black bg-white text-[#306CEC] px-3 py-1 rounded-full tracking-widest shadow"
                            style={{ fontFamily: 'League Spartan, sans-serif' }}>
                            POPULAR
                          </span>
                        )}
                        <h3 className={`font-black text-lg mb-1 ${plan.popular ? 'text-white' : 'text-[#306CEC]'}`}
                          style={{ fontFamily: 'League Spartan, sans-serif' }}>
                          {plan.name.toUpperCase()}
                        </h3>
                        {plan.save && (
                          <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full mb-4 tracking-wide ${plan.popular ? 'bg-white/20 text-white' : darkMode ? 'bg-[#306CEC]/15 text-[#306CEC]' : 'bg-green-100 text-green-700'}`}>
                            SAVE KES {plan.save}
                          </span>
                        )}
                        <div className={`flex items-baseline gap-1 mb-1 mt-2 ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-[#0a0a14]'}`}>
                          <span className="text-sm font-semibold">KES</span>
                          <span className="text-4xl md:text-5xl font-black leading-none" style={{ fontFamily: 'League Spartan, sans-serif' }}>{plan.price}</span>
                        </div>
                        <p className={`text-[10px] tracking-widest uppercase mb-6 ${plan.popular ? 'text-white/50' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>/ year</p>

                        <div className="space-y-2.5 mb-6 flex-grow">
                          <AnimatePresence mode="wait">
                            {visibleFeatures.map((feature, i) => (
                              <motion.div key={`${planKey}-f-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.02 }}
                                className="flex items-start gap-2">
                                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.popular ? 'text-white/70' : 'text-[#306CEC]'}`} strokeWidth={3} />
                                <span className={`text-sm leading-snug ${plan.popular ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          {hasMore && (
                            <button onClick={() => togglePlanExpansion(planKey)}
                              className={`text-xs font-bold transition-colors ${plan.popular ? 'text-white/55 hover:text-white' : 'text-[#306CEC]'}`}>
                              {isExpanded ? '− less' : `+ ${plan.features.length - 3} more`}
                            </button>
                          )}
                        </div>

                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => handleSubscribeClick(plan)}
                          className={`w-full py-3 rounded-xl font-black text-sm tracking-wider transition-all ${
                            plan.popular ? 'bg-white text-[#306CEC] hover:bg-gray-50' : 'bg-[#306CEC] text-white hover:bg-[#2558d4]'
                          }`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                          GET STARTED →
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── PERKS ─── */}
      <section className={`py-20 px-6 ${darkMode ? 'bg-white/[0.02]' : 'bg-white'} border-y ${darkMode ? 'border-white/6' : 'border-gray-100'}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className={`text-[10px] font-bold tracking-[0.22em] uppercase mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>What you get</p>
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
              style={{ fontFamily: 'League Spartan, sans-serif' }}>
              WHAT YOU GET
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Every ticket and membership comes packed with value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Ticket,   title: 'Event Access',  desc: 'Priority entry to every Impact360 workshop, masterclass, and city roadshow.' },
              { Icon: BookOpen, title: 'Resources',      desc: 'Slides, playbooks, templates, and curated session materials.' },
              { Icon: Users,    title: 'Community',      desc: 'Connect with founders, mentors, and industry leaders directly.' },
              { Icon: Gift,     title: 'Perks',          desc: 'Discounts, certificates, merch, and special recognition.' },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl p-6 transition-all ${darkMode ? 'bg-white/[0.04] border border-white/8 hover:border-[#306CEC]/30' : 'bg-gray-50 border border-gray-100 hover:border-[#306CEC]/25 hover:shadow-md'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${darkMode ? 'bg-[#306CEC]/15' : 'bg-[#306CEC]/10'}`}>
                  <Icon className="w-5 h-5 text-[#306CEC]" strokeWidth={2} />
                </div>
                <h3 className={`font-black text-sm mb-2 ${darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
                  style={{ fontFamily: 'League Spartan, sans-serif' }}>{title.toUpperCase()}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className={`text-[10px] font-bold tracking-[0.22em] uppercase mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>FAQ</p>
            <h2 className={`text-3xl md:text-4xl font-black ${darkMode ? 'text-white' : 'text-[#0a0a14]'}`}
              style={{ fontFamily: 'League Spartan, sans-serif' }}>
              COMMON QUESTIONS
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }} viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden border transition-all ${
                  openFaq === i
                    ? darkMode ? 'border-[#306CEC]/35 bg-[#306CEC]/7' : 'border-[#306CEC]/25 bg-[#306CEC]/4'
                    : darkMode ? 'border-white/7 bg-white/[0.025] hover:border-white/14' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className={`font-bold text-sm md:text-base leading-snug ${darkMode ? 'text-white' : 'text-[#0a0a14]'}`}>
                    {faq.question}
                  </span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.22 }}
                    className={`text-xl font-light shrink-0 leading-none ${openFaq === i ? 'text-[#306CEC]' : darkMode ? 'text-white/25' : 'text-black/25'}`}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                      <p className={`px-6 pb-5 text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-[#306CEC] uppercase mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Don't miss out
          </p>
          <h2
            className={`text-5xl md:text-7xl font-black leading-tight mb-6 ${darkMode ? 'text-white' : 'text-[#111]'}`}
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            THE ROOM IS<br />
            <span className="text-[#306CEC]">FILLING UP.</span>
          </h2>
          <p className={`text-lg mb-10 max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Spots are limited. Secure your ticket or membership before they're gone.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setSelectedPlan('tickets'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-[#306CEC] text-white px-10 py-4 rounded-full font-bold hover:bg-[#4A80FF] transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Get a Ticket →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setSelectedPlan('membership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`border-2 px-10 py-4 rounded-full font-bold transition-all duration-300 ${darkMode ? 'border-white/30 text-white hover:border-white' : 'border-black/20 text-[#111] hover:border-black'}`}
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Join as Member
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Type Selector Modal */}
      <AnimatePresence>
        {showTypeSelector && pendingPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTypeSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1f3a] border border-[#306CEC]/20"
            >
              <button
                onClick={() => setShowTypeSelector(false)}
                className="absolute top-1 right-3 sm:top-2 sm:right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#306CEC]/20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-[#306CEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Choose Subscription Type
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Select how you want to subscribe for the <span className="font-bold">{pendingPlan.name}</span> plan.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleTypeSelect('Events')}
                  className="w-full py-3 rounded-full bg-[#306CEC] text-white font-bold text-lg hover:bg-[#1a4d9e] transition"
                >
                  Event Ticket
                </button>
                <button
                  onClick={() => handleTypeSelect('Membership')}
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition"
                >
                  Membership
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Membership Benefits Modal */}
      <AnimatePresence>
        {subscriptionType === 'Membership' && planToSubscribe && !showPaymentInfo && (
          <MembershipBenefitsModal
            plan={planToSubscribe}
            onClose={() => {
              setPlanToSubscribe(null);
              setSubscriptionType('Events');
            }}
            onContinue={() => {
              setShowPaymentInfo(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Payment Information Modal - Responsive */}
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
              className={`relative w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
                darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
              }`}
            >
              <button
                onClick={handleCloseModals}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="text-center mb-6 sm:mb-8">
                <CreditCard className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} />
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  PAYMENT INFORMATION
                </h3>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {planToSubscribe.name} Plan - KES {planToSubscribe.price}/{planToSubscribe.period}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {/* Paybill Number */}
                <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 ${darkMode ? 'bg-black border-[#306CEC]/30' : 'bg-gray-50 border-gray-200'}`}>
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    BUSINESS NUMBER (PAYBILL)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={MPESA_PAYBILL}
                      readOnly
                      className={`w-full pr-12 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xl sm:text-2xl text-center ${
                        darkMode ? 'bg-[#1a1f3a] text-[#306CEC] border border-[#306CEC]/20' : 'bg-white text-[#306CEC] border border-gray-300'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(MPESA_PAYBILL, 'paybill')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors ${
                        darkMode ? 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white' : 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white'
                      }`}
                      style={{ lineHeight: 0 }}
                    >
                      {copied.paybill ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Copy className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </motion.button>
                  </div>
                </div>

                {/* Account Number */}
                <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 ${darkMode ? 'bg-black border-[#306CEC]/30' : 'bg-gray-50 border-gray-200'}`}>
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ACCOUNT NUMBER
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={MPESA_ACCOUNT}
                      readOnly
                      className={`w-full pr-12 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xl sm:text-2xl text-center ${
                        darkMode ? 'bg-[#1a1f3a] text-[#306CEC] border border-[#306CEC]/20' : 'bg-white text-[#306CEC] border border-gray-300'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(MPESA_ACCOUNT, 'account')}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors ${
                        darkMode ? 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white' : 'bg-[#306CEC] hover:bg-[#1a4d9e] text-white'
                      }`}
                      style={{ lineHeight: 0 }}
                    >
                      {copied.account ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Copy className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </motion.button>
                  </div>
                </div>

                {/* Amount Display */}
                <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center ${darkMode ? 'bg-[#306CEC]/10 border border-[#306CEC]/30' : 'bg-green-50 border border-green-200'}`}>
                  <p className={`text-xs sm:text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    AMOUNT TO PAY
                  </p>
                  <p className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-[#306CEC]' : 'text-green-600'}`}>
                    KES {planToSubscribe.price}
                  </p>
                </div>
              </div>

              {/* Proceed Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToTicketForm}
                className={`w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]' : 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                <span>
                  {subscriptionType === 'Membership' ? 'PROCEED' : 'GENERATE TICKET'}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <p className={`text-xs text-center mt-3 sm:mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {subscriptionType === 'Membership'
                  ? 'Click the button above after completing your M-Pesa payment to proceed with your membership application'
                  : 'Click the button above after completing your M-Pesa payment to proceed with ticket generation'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Ticket Form Modal - Responsive */}
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
              className={`relative w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
                darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
              }`}
            >
              <button
                onClick={handleCloseModals}
                disabled={isProcessing}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#306CEC]/20 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="text-center mb-6 sm:mb-8">
                {subscriptionType === 'Membership' ? (
                  <Users className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} />
                ) : (
                  <Ticket className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} />
                )}
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {subscriptionType === 'Membership' ? 'MEMBERSHIP APPLICATION' : 'GENERATE YOUR TICKET'}
                </h3>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-[#306CEC]'}`}>
                  {planToSubscribe.name} Plan - KES {planToSubscribe.price}/{planToSubscribe.period}
                </p>
              </div>

              <form onSubmit={handleTicketFormSubmit} className="space-y-4 sm:space-y-6">
                {/* Full Name */}
                <div>
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={ticketFormData.fullName}
                    onChange={handleTicketFormChange}
                    required
                    disabled={isProcessing}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-colors text-sm sm:text-base ${
                      darkMode 
                        ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>

                  {/* City Dropdown - Only for Ticket Form */}
                  {subscriptionType !== 'Membership' && (
                    <div className="relative">
                      <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        CITY *
                      </label>
                      <div className="relative">
                        <select
                          name="city"
                          value={ticketFormData.city}
                          onChange={handleTicketFormChange}
                          required
                          disabled={isProcessing}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-colors text-sm sm:text-base appearance-none pr-12 focus:outline-none ${
                            darkMode 
                              ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                              : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <option value="" disabled className="text-gray-500">Select the paid city event</option>
                          <option value="Nakuru">Nakuru</option>
                          <option value="Eldoret">Eldoret</option>
                          <option value="Kisumu">Kisumu</option>
                          <option value="Mombasa">Mombasa</option>
                          <option value="Arusha">Arusha</option>
                          <option value="Nairobi">Nairobi</option>
                          <option value="Kigali">Kigali</option>
                          <option value="Addis ababa">Addis ababa</option>
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={darkMode ? 'white' : 'black'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 8l-7 8-7-8" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  )}
                {/* Email */}
                <div>
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={ticketFormData.email}
                    onChange={handleTicketFormChange}
                    required
                    disabled={isProcessing}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-colors text-sm sm:text-base ${
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
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={ticketFormData.phone}
                    onChange={handleTicketFormChange}
                    required
                    disabled={isProcessing}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-colors text-sm sm:text-base ${
                      darkMode 
                        ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>

                {/* M-Pesa Message */}
                <div>
                  <label className={`block text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    M-PESA CONFIRMATION MESSAGE *
                  </label>
                  <textarea
                    name="mpesaMessage"
                    value={ticketFormData.mpesaMessage}
                    onChange={handleTicketFormChange}
                    required
                    disabled={isProcessing}
                    rows={5}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-colors resize-none text-sm sm:text-base ${
                      darkMode 
                        ? 'bg-black border-[#306CEC]/20 text-white focus:border-[#306CEC] placeholder-gray-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-[#306CEC] placeholder-gray-400'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Paste your complete cooperative bank SMS here

Example:
Dear John Doe, you have sent Ksh. 999.0 to THE O'GAD IMPACT GROUP LTD for 1118559 on 01/10/2026 at 14:31:45. MPESA Ref. UAAAH3CTZR."
                  />
                  <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    📱 Copy and paste the <strong>complete M-Pesa confirmation SMS</strong> you received after payment
                  </p>
                </div>

                {/* Important Notice */}
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className={`text-xs sm:text-sm font-bold mb-2 ${darkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>
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
                  className={`w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg ${
                    darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]' : 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]'
                  } ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      PROCESSING...
                    </span>
                  ) : (
                    subscriptionType === 'Membership'
                    ? 'SUBMIT MEMBERSHIP APPLICATION'
                    : 'SUBMIT & GENERATE TICKET'
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

      <Footer />
    </div>
  );
}