import React from "react";
import { motion } from "framer-motion";

// Lucide Icons
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document
      .getElementById(sectionId.toLowerCase().replace(/\s+/g, "-"));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#1a4d9e] via-[#306CEC] to-[#4c8aff] text-[#FFFEF9] overflow-hidden">

      {/* Animated Blurred Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#FFFEF9] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <section id="contact" className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-20">

          {/* ===================== MAIN GRID ====================== */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* ---------- BRAND SECTION ---------- */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-16 h-16 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img src="/logo4.png" alt="Impact360 Logo"
                       className="w-full h-full object-contain drop-shadow-lg" />
                </motion.div>
                <span className="text-3xl font-bold">Impact360</span>
              </div>

              <p className="text-[#FFFEF9]/90 text-lg leading-relaxed mb-6">
                Empowering Africa's next generation of innovators, entrepreneurs, and changemakers
                through programs, community, and real-world impact.
              </p>

              {/* Contact Icons */}
              <div className="flex gap-4">
                {[
                  { icon: <Mail />, label: "Email", link: "mailto:info@impact360.com" },
                  { icon: <Phone />, label: "Phone", link: "tel:+254123456789" },
                  { icon: <MapPin />, label: "Location", link: "#" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    className="w-12 h-12 rounded-full bg-[#FFFEF9]/10 backdrop-blur-sm border border-[#FFFEF9]/20 flex items-center justify-center hover:bg-[#FFFEF9]/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ---------- QUICK LINKS ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "About", "Programs", "Events"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-[#FFFEF9]/80 hover:text-[#FFFEF9] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFFEF9]/50 group-hover:bg-[#FFFEF9]"></span>
                      {item}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ---------- SOCIAL MEDIA ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6">Connect</h3>
              <ul className="space-y-3">
                {[
                  { name: "Twitter", icon: <Twitter /> },
                  { name: "LinkedIn", icon: <Linkedin /> },
                  { name: "Instagram", icon: <Instagram /> },
                  { name: "Facebook", icon: <Facebook /> },
                ].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href="#" className="flex items-center gap-3 text-[#FFFEF9]/80 hover:text-[#FFFEF9]">
                      {item.icon}
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ============= NEWSLETTER ============= */}
          <motion.div
            className="bg-[#FFFEF9]/10 backdrop-blur-md rounded-3xl p-8 mb-16 border border-[#FFFEF9]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Stay Updated </h3>
                <p className="text-[#FFFEF9]/80">
                  Join our community for updates on programs, events, and opportunities.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-[#FFFEF9]/20 border border-[#FFFEF9]/30 text-[#FFFEF9] placeholder-[#FFFEF9]/50 focus:border-[#FFFEF9]"
                />
                <motion.button
                  className="px-8 py-4 bg-[#FFFEF9] text-[#306CEC] rounded-full font-bold hover:bg-[#FFFEF9]/90 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ============= BOTTOM BAR ============= */}
          <motion.div
            className="border-t border-[#FFFEF9]/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-[#FFFEF9] font-semibold text-lg mb-2">
                  © 2025 Impact360. All Rights Reserved.
                </p>
                <p className="text-[#FFFEF9]/70 text-sm">
                  Building Africa's Entrepreneurial Future
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                  <motion.a key={i} href="#" className="text-[#FFFEF9]/70 hover:text-[#FFFEF9]">
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="text-center mt-8 text-sm text-[#FFFEF9]/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Made by Impact360 in Africa
            </motion.div>
          </motion.div>
        </div>
      </section>
    </footer>
  );
}
