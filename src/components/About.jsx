import React from "react";
import { motion } from "framer-motion";
import { Rocket, Calendar, Wrench, BookOpen, Briefcase, Globe, Zap, Building2, Users, Sparkles } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  const { darkMode } = useDarkMode();

  const perks = [
    {
      icon: Rocket,
      title: "Programs",
      description: "Incubation, acceleration, and learning tracks designed to take your venture to the next level."
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Workshops, bootcamps, hackathons, and meetups to connect, learn, and grow together."
    },
    {
      icon: Wrench,
      title: "Resources",
      description: "Tools, software credits, workspace, labs, and funding opportunities for your startup."
    },
    {
      icon: BookOpen,
      title: "Knowledge",
      description: "Mentorship, masterclasses, templates, and expert support to guide your journey."
    },
    {
      icon: Briefcase,
      title: "Services",
      description: "Legal clinics, advisory, technical guidance, and business development support."
    }
  ];

  const approachValues = [
    {
      icon: Globe,
      title: "Decentralisation",
      description: "Running activities, programs, and support outside capital cities in counties, towns, universities, and community centers so more people can participate."
    },
    {
      icon: Zap,
      title: "Practical Empowerment",
      description: "Offering perks in the form of programs, events, resources, knowledge, and services that create real impact."
    },
    {
      icon: Building2,
      title: "Business Building",
      description: "Guiding founders from idea to validation, traction, and scale with structured support at every stage."
    },
    {
      icon: Users,
      title: "Ecosystem Building",
      description: "Connecting founders, local hubs, universities, partners, and community organizations to create strong regional ecosystems."
    },
    {
      icon: Sparkles,
      title: "Inclusivity",
      description: "Ensuring any ambitious entrepreneur can access opportunities regardless of their location or background."
    }
  ];

  const whoWeSupport = [
    "Idea-stage founders",
    "Early-stage startups",
    "Existing businesses looking to scale",
    "Community innovators",
    "Students and campus-based entrepreneurs"
  ];

  const fadeRise = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`font-sans transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}>
      <Navbar />

      {/* Who We Are */}
      <motion.section
        className={`py-28 px-6 transition-colors duration-1000 relative overflow-hidden ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
                Who We Are
                <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
              </h2>
              <p className={`text-lg md:text-xl leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Impact360 is an initiative under the O'Gad Impact Group focused on turning ideas into real businesses, helping existing ventures scale, and expanding tech entrepreneurship opportunities to communities beyond capital cities.
              </p>
              <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Our work is grounded in practical support programs, events, resources, knowledge, and services delivered in a decentralised way so founders everywhere can participate.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/group_photo1.jpeg"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-[#306CEC]/30 to-transparent' : 'bg-gradient-to-t from-[#306CEC]/20 to-transparent'}`}></div>
              </div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#306CEC] rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section
        className={`py-28 px-6 transition-colors duration-1000 relative overflow-hidden ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/group_photo2.jpeg"
                  alt="Vision for the future"
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-[#306CEC]/30 to-transparent' : 'bg-gradient-to-t from-[#306CEC]/20 to-transparent'}`}></div>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#306CEC] rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
                Our Vision
                <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
              </h2>
              <p className={`text-lg md:text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                To build ideas into businesses, scale existing ventures, and expand tech entrepreneurship by ensuring opportunities reach communities outside major cities.
              </p>

              <h2 className={`text-4xl md:text-5xl font-bold mb-4 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
                Our Mission
                <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
              </h2>
              <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                To provide accessible programs, tools, and support that help entrepreneurs at every stage from concept to growth while taking activities, learning, and resources directly to counties, towns, and underserved regions.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Approach */}
      <motion.section
        className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeRise}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
              Our Approach
              <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              How we create impact across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={fadeRise}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#1a1f3a] text-white border-2 border-[#306CEC]/20 hover:border-[#306CEC]'
                      : 'bg-white border-2 border-transparent hover:border-[#306CEC]/20'
                  }`}
                >
                  <IconComponent className={`w-16 h-16 mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>{value.title}</h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* What We Offer */}
      <motion.section
        className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeRise}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
              What We Offer
              <span className={`absolute left-0 bottom-0 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to build, scale, and succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => {
              const IconComponent = perk.icon;
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={fadeRise}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    darkMode
                      ? 'bg-[#1a1f3a] text-white border-2 border-[#306CEC]/20 hover:border-[#306CEC]'
                      : 'bg-white border-2 border-transparent hover:border-[#306CEC]/20'
                  }`}
                >
                  <IconComponent className={`w-16 h-16 mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} strokeWidth={1.5} />
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>{perk.title}</h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{perk.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Who We Support */}
      <motion.section
        className={`py-24 px-6 transition-colors duration-1000 ${darkMode ? 'bg-[#000000]' : 'bg-[#F5F6F8]'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>
                Who We Support
                <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
              </h2>
              <p className={`text-lg md:text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                We support entrepreneurs at every stage of their journey, providing the resources and guidance needed to succeed.
              </p>

              <div className="space-y-4">
                {whoWeSupport.map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeRise}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl shadow-md ${darkMode ? 'bg-[#1a1f3a] border border-[#306CEC]/20' : 'bg-white'}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></div>
                    <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/group_photo3.jpeg"
                  alt="Supporting entrepreneurs"
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-[#306CEC]/30 to-transparent' : 'bg-gradient-to-t from-[#306CEC]/20 to-transparent'}`}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Impact360 Matters */}
      <motion.section
        className={`py-28 px-6 relative overflow-hidden transition-colors duration-1000 ${
          darkMode ? 'bg-[#000000] text-[#306CEC]' : 'bg-[#F5F6F8] text-[#306CEC]'
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className={`absolute inset-0 opacity-10 pointer-events-none ${darkMode ? '' : ''}`}>
          <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></div>
          <div className={`absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></div>
          <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeRise}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 relative inline-block ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Why Impact360 Matters
              <span className={`absolute left-0 -bottom-2 w-20 h-1 rounded-full ${darkMode ? 'bg-[#306CEC]' : 'bg-[#306CEC]'}`}></span>
            </h2>
            <p className={`text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Opportunities shouldn't be limited to Nairobi or any major capital. Founders in towns and counties deserve equal access to tools and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode
                  ? 'bg-[#1a1f3a] border border-[#306CEC]/20'
                  : 'bg-white border border-[#d8e2f8]'
              }`}
            >
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>Equal Access for All</h3>
              <p className={`leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Every founder, regardless of location, should have access to the tools, mentorship, and community needed to grow.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeRise}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode
                  ? 'bg-[#1a1f3a] border border-[#306CEC]/20'
                  : 'bg-white border border-[#d8e2f8]'
              }`}
            >
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-[#306CEC]' : 'text-[#306CEC]'}`}>Decentralised Growth</h3>
              <p className={`leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Africa's next generation of businesses can emerge from anywhere. A decentralized model strengthens ecosystems continent-wide.
              </p>
            </motion.div>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeRise}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`mt-12 text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}
          >
            A decentralised model strengthens ecosystems and widens economic participation across the continent.
          </motion.p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
