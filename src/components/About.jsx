import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/programs');
  };

  const perks = [
    {
      icon: "🚀",
      title: "Programs",
      description: "Incubation, acceleration, and learning tracks designed to take your venture to the next level."
    },
    {
      icon: "📅",
      title: "Events",
      description: "Workshops, bootcamps, hackathons, and meetups to connect, learn, and grow together."
    },
    {
      icon: "🛠️",
      title: "Resources",
      description: "Tools, software credits, workspace, labs, and funding opportunities for your startup."
    },
    {
      icon: "📚",
      title: "Knowledge",
      description: "Mentorship, masterclasses, templates, and expert support to guide your journey."
    },
    {
      icon: "💼",
      title: "Services",
      description: "Legal clinics, advisory, technical guidance, and business development support."
    }
  ];

  const approachValues = [
    {
      icon: "🌍",
      title: "Decentralisation",
      description: "Running activities, programs, and support outside capital cities in counties, towns, universities, and community centers so more people can participate."
    },
    {
      icon: "💪",
      title: "Practical Empowerment",
      description: "Offering perks in the form of programs, events, resources, knowledge, and services that create real impact."
    },
    {
      icon: "🏗️",
      title: "Business Building",
      description: "Guiding founders from idea to validation, traction, and scale with structured support at every stage."
    },
    {
      icon: "🤝",
      title: "Ecosystem Building",
      description: "Connecting founders, local hubs, universities, partners, and community organizations to create strong regional ecosystems."
    },
    {
      icon: "✨",
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
    <div className="font-sans bg-[#F5F6F8]">
      <Navbar />

      {/* Who We Are */}
      <motion.section
        className="py-28 px-6 bg-[#F5F6F8] transition-colors duration-1000 relative overflow-hidden"
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6 relative inline-block">
                Who We Are
                <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Impact360 is an initiative under the O'Gad Impact Group focused on turning ideas into real businesses, helping existing ventures scale, and expanding tech entrepreneurship opportunities to communities beyond capital cities.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
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
                {/* Image used in original snippet */}
                <img
                  src="/group_photo1.jpeg"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/20 to-transparent"></div>
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
        className="py-28 px-6 bg-[#F5F6F8] transition-colors duration-1000 relative overflow-hidden"
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
                {/* Vision image used earlier */}
                <img
                  src="/group_photo2.jpeg"
                  alt="Vision for the future"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/20 to-transparent"></div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4 relative inline-block">
                Our Vision
                <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                To build ideas into businesses, scale existing ventures, and expand tech entrepreneurship by ensuring opportunities reach communities outside major cities.
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4 relative inline-block">
                Our Mission
                <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                To provide accessible programs, tools, and support that help entrepreneurs at every stage from concept to growth while taking activities, learning, and resources directly to counties, towns, and underserved regions.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Approach */}
      <motion.section
        className="py-24 px-6 bg-[#F5F6F8] transition-colors duration-1000"
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4 relative inline-block">
              Our Approach
              <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              How we create impact across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachValues.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeRise}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] text-[#FFFEF9] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-[#FFFEF9]/90 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Perks / What We Offer */}
      <motion.section
        className="py-24 px-6 bg-[#F5F6F8] transition-colors duration-1000"
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4 relative inline-block">
              What We Offer
              <span className="absolute left-0 bottom-0 w-20 h-1 bg-[#306CEC] rounded-full"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, scale, and succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeRise}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#306CEC]/20"
              >
                <div className="text-6xl mb-4">{perk.icon}</div>
                <h3 className="text-2xl font-bold text-[#306CEC] mb-3">{perk.title}</h3>
                <p className="text-gray-700 leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Who We Support */}
      <motion.section
        className="py-24 px-6 bg-[#F5F6F8] transition-colors duration-1000"
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6 relative inline-block">
                Who We Support
                <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
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
                    className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#306CEC]"></div>
                    <p className="text-lg text-gray-700 font-medium">{item}</p>
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
                {/* Who We Support image used earlier */}
                <img
                  src="/group_photo3.jpeg"
                  alt="Supporting entrepreneurs"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Impact360 Matters */}
      <motion.section
        className="py-28 px-6 bg-[#F5F6F8] text-[#306CEC] relative overflow-hidden transition-colors duration-1000"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeRise}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-[#306CEC] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#306CEC] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#306CEC] rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative inline-block" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Why Impact360 Matters
              <span className="absolute left-0 -bottom-2 w-20 h-1 rounded-full bg-[#306CEC]"></span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-gray-700">
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
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d8e2f8]"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#306CEC]">Equal Access for All</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
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
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d8e2f8]"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#306CEC]">Decentralised Growth</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
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
            className="mt-12 text-xl md:text-2xl font-bold text-gray-700"
          >
            A decentralised model strengthens ecosystems and widens economic participation across the continent.
          </motion.p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
