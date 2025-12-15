import React, { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, BookOpen, Users, Gift, Check } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const subscriptionPlans = {
    monthly: [
      {
        name: "Student",
        price: "999",
        period: "mo",
        features: ["1 event access", "slides", "resource pack"]
      },
      {
        name: "Pro",
        price: "2,499",
        period: "mo",
        features: ["Access to event", "networking zone", "digital resources"],
        popular: true
      },
      {
        name: "Premium",
        price: "4,499",
        period: "mo",
        features: ["VIP seating", "spotlight networking", "partner invites"]
      }
    ],
    quarterly: [
      {
        name: "Student",
        price: "2,699",
        period: "3mo",
        features: ["3 sessions + replays", "1 free guest pass per quarter"],
        save: "295"
      },
      {
        name: "Pro",
        price: "6,999",
        period: "3mo",
        features: ["3 sessions", "1 VIP mixer invite", "priority entry"],
        save: "498",
        popular: true
      },
      {
        name: "Premium",
        price: "12,499",
        period: "3mo",
        features: ["Exclusive roundtable access", "event recordings"],
        save: "998"
      }
    ],
    biannual: [
      {
        name: "Student",
        price: "5,199",
        period: "6mo",
        features: ["6 sessions", "certificate of participation", "growth toolkit"],
        save: "795"
      },
      {
        name: "Pro",
        price: "13,499",
        period: "6mo",
        features: ["6 sessions", "full replay access", "community membership"],
        save: "1,495",
        popular: true
      },
      {
        name: "Premium",
        price: "23,999",
        period: "6mo",
        features: ["Mastermind dinner", "recognition certificate", "all replays"],
        save: "2,995"
      }
    ],
    annual: [
      {
        name: "Student",
        price: "9,999",
        period: "yr",
        features: ["12 sessions", "all replays", "invite to Student Impact Summit"],
        save: "1,985"
      },
      {
        name: "Pro",
        price: "23,999",
        period: "yr",
        features: ["12 sessions", "partner discounts", "Impact360 T-shirt"],
        save: "5,989",
        popular: true
      },
      {
        name: "Premium",
        price: "44,999",
        period: "yr",
        features: ["All-access", "private dinner", "media spotlight", "merch pack"],
        save: "8989"
      }
    ]
  };

  const benefits = [
    {
      Icon: Ticket,
      title: "Event Access",
      description: "Priority access to all our workshops, masterclasses, and networking events"
    },
    {
      Icon: BookOpen,
      title: "Resources",
      description: "Get slides, toolkits, templates, and exclusive materials from every session"
    },
    {
      Icon: Users,
      title: "Community",
      description: "Connect with fellow entrepreneurs, mentors, and industry leaders"
    },
    {
      Icon: Gift,
      title: "Perks",
      description: "Enjoy discounts, merch, certificates, and special recognition opportunities"
    }
  ];

  return (
    <div className="font-sans bg-[#FFFEF9]">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-gradient-to-br from-[#306CEC] to-[#1a4d9e]">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Subscription Plans
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Choose the perfect plan to accelerate your entrepreneurial journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan Period Selector */}
      <section className="py-16 px-6">
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
                    ? 'bg-[#306CEC] text-white shadow-xl'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-lg'
                }`}
              >
                {plan.label}
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
                className={`relative rounded-3xl p-8 shadow-2xl flex flex-col ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] text-white scale-105'
                    : 'bg-white text-gray-900'
                }`}
              >
                
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-[#306CEC]'}`}>
                    {plan.name}
                  </h3>
                  
                  {plan.save && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-4"
                    >
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        plan.popular ? 'bg-yellow-400 text-gray-900' : 'bg-green-100 text-green-700'
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
                  <div className={`text-sm mt-3 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
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
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-yellow-300' : 'text-[#306CEC]'}`} strokeWidth={2.5} />
                      <span className={`${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                    plan.popular
                      ? 'bg-white text-[#306CEC] hover:bg-gray-100'
                      : 'bg-[#306CEC] text-white hover:bg-[#1a4d9e]'
                  }`}
                >
                  Subscribe Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Event Experiences */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 border border-white/30"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Optional Add-On
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-white mb-6"
              >
                Extend Your Experience
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed"
              >
                Don't rush home after the event! Join us for optional leisure activities — unwind, explore scenic locations, and build deeper connections in a relaxed setting.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-white/70 text-sm mb-8"
              >
                🌟 Unique experiences for each city • Separate booking & pricing
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white/30"
              >
                <span className="text-2xl">✨</span>
                Details Coming Soon
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4">
              Why Subscribe?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <IconComponent className="w-14 h-14 mx-auto mb-4 text-[#306CEC]" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#306CEC] mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4">
              Frequently Asked Questions
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
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-[#306CEC] mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}