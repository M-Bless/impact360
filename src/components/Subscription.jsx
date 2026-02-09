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
  const [selectedPlan, setSelectedPlan] = useState('spotlight');
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
  const [subscriptionType, setSubscriptionType] = useState('Events'); // NEW: 'Events' or 'Membership'
  const [showTypeSelector, setShowTypeSelector] = useState(false); // NEW
  const [pendingPlan, setPendingPlan] = useState(null); // NEW
  const { darkMode } = useDarkMode();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // M-Pesa Payment Details
  const MPESA_PAYBILL = "400200";
  const MPESA_ACCOUNT = "1118559";

  const subscriptionPlans = {
    spotlight: [
      { name: "Student", price: "999", period: "mo", features: ["1 event access"] },
      { name: "Pro", price: "2,099", period: "mo", features: ["1 event access"], popular: true },
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

  const benefits = [
    { Icon: Ticket, title: "Event Access", description: "Priority access to all our workshops, masterclasses, and networking events" },
    { Icon: BookOpen, title: "Resources", description: "Get slides, toolkits, templates, and exclusive materials from every session" },
    { Icon: Users, title: "Community", description: "Connect with fellow entrepreneurs, mentors, and industry leaders" },
    { Icon: Gift, title: "Perks", description: "Enjoy discounts, merch, certificates, and special recognition opportunities" }
  ];

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
    // For Membership plans, go directly to payment
    if (selectedPlan === 'membership') {
      setSubscriptionType('Membership');
      setPlanToSubscribe(plan);
      setShowPaymentInfo(true);
    } else {
      // For Spotlight, Momentum, Mastery - go directly to payment
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

  return (
    <div className={`transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
     

      {/* Header Section - Responsive */}
      <section className={`relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 overflow-hidden transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]'}`}>
        <motion.div 
          className={`absolute top-20 right-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-10 left-10 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
         <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-[#306CEC]' : 'text-white'} px-4`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              SUBSCRIPTION PLANS
            </h1>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-white/90'} px-4`}>
              Choose the perfect plan to accelerate your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan Period Selector - Responsive */}
      <section className={`py-12 sm:py-14 md:py-16 px-4 sm:px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }} 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-14 md:mb-16"
          >
            {([
              { key: 'spotlight', label: 'Spotlight Pass' },
              { key: 'momentum', label: 'Momentum Pass' },
              { key: 'mastery', label: 'Mastery Pass' },
              { key: 'membership', label: 'Membership' }
            ]).map((plan) => (
              <motion.button 
                key={plan.key} 
                onClick={() => {
                  setSelectedPlan(plan.key);
                  // State will persist - each plan tracks its own expansion independently
                }} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${
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

          {/* Pricing Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto">
            {subscriptionPlans[selectedPlan].map((plan, index) => {
              const planKey = `${selectedPlan}-${plan.name}-${index}`;
              const isExpanded = expandedPlans[planKey] === true;
              const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 3);
              const hasMore = plan.features.length > 3;

              return (
              <motion.div 
                key={planKey}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.6 }} 
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.05 }}
                className={`relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col transition-colors duration-1000 ${
                  plan.popular
                    ? darkMode
                      ? 'bg-black border-2 border-[#306CEC] text-white'
                      : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] text-white scale-105'
                    : darkMode
                    ? 'bg-black border border-[#306CEC]/20 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <div className="text-center mb-8 sm:mb-10">
                  <h3 className={`text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${plan.popular ? darkMode ? 'text-[#306CEC]' : 'text-white' : darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {plan.name.toUpperCase()}
                  </h3>
                  {plan.save && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-3 sm:mb-4">
                      <div className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                        darkMode ? 'bg-[#306CEC]/20 text-[#306CEC] border border-[#306CEC]/30' : plan.popular ? 'bg-yellow-400 text-gray-900' : 'bg-green-100 text-green-700'
                      }`}>
                        Save KES. {plan.save}
                      </div>
                    </motion.div>
                  )}
                  <div className="flex items-baseline justify-center gap-1 sm:gap-2">
                    <span className="text-base sm:text-lg">KES.</span>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">{plan.price}</span>
                  </div>
                  <div className={`text-xs sm:text-sm mt-2 sm:mt-3 ${plan.popular ? darkMode ? 'text-gray-400' : 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Subscription
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 flex-grow">
                  <AnimatePresence mode="wait">
                    {visibleFeatures.map((feature, i) => (
                      <motion.div 
                        key={`${planKey}-feature-${i}`}
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.05 + i * 0.02 }} 
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${plan.popular ? darkMode ? 'text-[#306CEC]' : 'text-yellow-300' : darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={2.5} />
                        <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : plan.popular ? 'text-white/90' : 'text-gray-600'}`}>{feature}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {hasMore && (
                  <button
                    onClick={() => {
                      console.log('Toggling:', planKey, 'Current:', isExpanded);
                      togglePlanExpansion(planKey);
                    }}
                    className={`text-xs font-bold mb-4 transition-colors ${
                      darkMode ? 'text-[#306CEC] hover:text-[#1a9bd1]' : plan.popular ? 'text-white hover:text-gray-200' : 'text-[#306CEC] hover:text-[#1a9bd1]'
                    }`}
                  >
                    {isExpanded ? '- Show Less' : '+ Show More'}
                  </button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubscribeClick(plan)}
                  className={`w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                    darkMode ? 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]' : plan.popular ? 'bg-white text-[#306CEC] hover:bg-gray-100' : 'bg-[#306CEC] text-white hover:bg-[#1a9bd1]'
                  }`}
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  SUBSCRIBE NOW
                </motion.button>
              </motion.div>
            );
            })}

          </div>
        </div>
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

      {/* Post-Event Experiences Section - Responsive */}
      <section className={`py-12 sm:py-14 md:py-16 px-4 sm:px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden transition-colors duration-1000 ${
              darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]'
            }`}
          >
            <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}></div>
            <div className={`absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]/10' : 'bg-white/10'}`}></div>
            
            <div className="relative z-10 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 ${darkMode ? 'text-[#306CEC]' : 'text-white'}`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                EXTEND YOUR EXPERIENCE
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-base sm:text-lg md:text-xl mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-white/90'}`}
              >
                Don't rush home after the event! Join us for optional leisure activities — unwind, explore scenic locations, and build deeper connections in a relaxed setting.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className={`text-xs sm:text-sm mb-6 sm:mb-8 ${darkMode ? 'text-gray-400' : 'text-white/70'}`}
              >
                 Unique experiences for each city • Separate booking & pricing
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 ${
                  darkMode ? 'bg-[#306CEC]/20 border-[#306CEC]/30' : 'bg-white/20 border-white/30'
                }`}
              >
                <span className="text-xl sm:text-2xl"></span>
                Details Coming Soon
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Benefits Section - Responsive */}
      <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#F5F5f0]'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-12 sm:mb-14 md:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              WHY SUBSCRIBE?
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get exclusive access to events, resources, and a thriving community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
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
                  className={`p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
                    darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                  }`}
                >
                  <IconComponent className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {benefit.title.toUpperCase()}
                  </h3>
                  <p className={`leading-relaxed text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - Responsive */}
      <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-[#FFFEF9]'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-14 md:mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
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
                className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-colors duration-1000 ${
                  darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'
                }`}
              >
                <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {faq.question.toUpperCase()}
                </h3>
                <p className={`leading-relaxed text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}