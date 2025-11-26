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

  return (
    <div className="font-sans">
      <Navbar />
      
      {/* Who We Are Section */}
      <section className="py-24 px-6 bg-[#FFFEF9] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6">
                Who We Are
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Impact360 is an initiative under the O'Gad Impact Group focused on turning ideas into real businesses, helping existing ventures scale, and expanding tech entrepreneurship opportunities to communities beyond capital cities.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Our work is grounded in practical support programs, events, resources, knowledge, and services delivered in a decentralised way so founders everywhere can participate.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczNiCB1-OPYvdnXlL8NkBO4c1IY730DJ6kUQhYWYkffqWTjXj1zsVvodL9l70sjeBz7Vbk0kQHWuy8BOGs3483CL6sW1SmCEefnBJSOmcnqQ2msa_WZWzOjwsdFEvUumgPJMPnr4dWxAxxmw_K5iaVWL=w1335-h890-s-no-gm?authuser=0"
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
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 px-6 bg-[#F5F5F0] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczNZxHaJ2lgAt0NcUVxZuxjYO2fgIw9sdclmrabWPPHV_IpO1JjPva1LJkzLXn90q1rAUmQXG2aRx1Ulrdd2RmmF6HblziXYzc7nmpqDI0l3rfbce5MT-mVYF6x3nPUlYCtD7IAZYRefJQlywOKVG0jV=w1335-h890-s-no-gm?authuser=0"
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                To build ideas into businesses, scale existing ventures, and expand tech entrepreneurship by ensuring opportunities reach communities outside major cities.
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                To provide accessible programs, tools, and support that help entrepreneurs at every stage from concept to growth while taking activities, learning, and resources directly to counties, towns, and underserved regions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-6 bg-[#FFFEF9] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4">
              Our Approach
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              How we create impact across Africa
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
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
      </section>

      {/* Perks Section */}
      <section className="py-24 px-6 bg-[#F5F5F0] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-4">
              What We Offer
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, scale, and succeed
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#306CEC]/20"
              >
                <div className="text-6xl mb-4">{perk.icon}</div>
                <h3 className="text-2xl font-bold text-[#306CEC] mb-3">
                  {perk.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Support Section */}
      <section className="py-24 px-6 bg-[#FFFEF9] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6">
                Who We Support
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                We support entrepreneurs at every stage of their journey, providing the resources and guidance needed to succeed.
              </p>
              <div className="space-y-4">
                {whoWeSupport.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#306CEC]"></div>
                    <p className="text-lg text-gray-700 font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczNGrNxHe5aQ1eRtXXNVpKjiHLT0G7sJw6gGN-RT1ukJxdhSaCrRIj2LztvPwIG2zlDNDOiYhkf_-QizsJOBZN4Yf_aSJZONOuR7Qo0WXLBfcXgGha4cpo89p3YIIlmJ7ZGhKffVjPpQREKucwzFFDd5=w1335-h890-s-no-gm?authuser=0"
                  alt="Supporting entrepreneurs"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#306CEC]/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Matter Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#306CEC] to-[#1a4d9e] text-[#FFFEF9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Why Impact360 Matters
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              Opportunities shouldn't be limited to Nairobi or any major capital. Founders in towns and counties deserve equal access to tools and support.
            </p>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6">
              Africa's next generation of businesses can emerge from anywhere.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-[#FFFEF9]/90">
              A decentralised model strengthens ecosystems and widens economic participation across the continent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#FFFEF9] transition-colors duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#306CEC] mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              Whether you're a founder, mentor, or supporter, there's a place for you in our community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/subscription')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#306CEC] text-[#FFFEF9] rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={handleLearnMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#306CEC] text-[#306CEC] rounded-full font-bold text-lg hover:bg-[#306CEC] hover:text-[#FFFEF9] transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}