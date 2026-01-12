import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item) => {
    const routes = {
      "Home": "/",
      "About": "/about",
      "Programs": "/programs",
      "Events": "/events",
      "Subscription": "/subscription"
    };

    const route = routes[item];
    if (route) {
      // If already on the page, scroll to top
      if (location.pathname === route) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to the page
        navigate(route);
      }
    }
  };

  return (
    <footer className={`relative ${darkMode ? 'bg-gray-900' : 'bg-[#1a5632]'} text-white overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-32 -right-32 w-64 h-64 ${darkMode ? 'bg-blue-500/5' : 'bg-white/5'} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-32 -left-32 w-96 h-96 ${darkMode ? 'bg-purple-500/5' : 'bg-white/5'} rounded-full blur-3xl`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${darkMode ? 'bg-blue-500' : 'bg-[#FFD700]'} rounded-lg flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#1a5632]'}`}>I</span>
                </div>
                <span className="text-2xl font-bold">Impact360</span>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-[#FFFEF9]/80'} mb-6 text-sm leading-relaxed`}>
                Empowering Africa's next generation of innovators through programs,
                community, and real-world impact.
              </p>
              {/* CONTACT ICONS */}
              <div className="flex gap-3">
                {[
                  { icon: <Mail className="w-5 h-5" />, link: "mailto:info@impact360.com" },
                  { icon: <Phone className="w-5 h-5" />, link: "tel:+254123456789" },
                  { icon: <MapPin className="w-5 h-5" />, link: "#" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/10 hover:bg-white/20'} flex items-center justify-center transition-colors`}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:col-span-1"
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Programs", "Events", "Subscription"].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`${
                      darkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-[#FFFEF9]/80 hover:text-[#FFFEF9]'
                    } transition-colors text-left text-sm`}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SOCIALS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-1"
          >
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-3">
              {[
                { name: "Instagram", icon: <Instagram className="w-5 h-5" />, link: "https://www.instagram.com/impac_t360/" },
                { name: "YouTube", icon: <Youtube className="w-5 h-5" />, link: "https://www.youtube.com/@Impact-360-Official" },
                { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/company/impact360%E2%80%A2/" },
                { name: "TikTok", icon: <TikTokIcon />, link: "https://www.tiktok.com/@impact360_?_r=1&_t=ZM-92GxGgxmARM" },
              ].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${
                      darkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-[#FFFEF9]/80 hover:text-[#FFFEF9]'
                    } transition-colors text-sm`}
                  >
                    {item.icon} {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-[#FFFEF9]/80'} mb-4 text-sm`}>
              Join our community for updates on programs & events.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className={`flex-1 px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500'
                    : 'bg-white/10 text-white placeholder-white/50 focus:ring-white/30'
                } focus:outline-none focus:ring-2 transition-all text-sm`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-[#FFD700] hover:bg-[#FFC700] text-[#1a5632]'
                } font-semibold transition-colors whitespace-nowrap text-sm`}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className={`pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-white/10'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <p className={`${darkMode ? 'text-gray-400' : 'text-[#FFFEF9]/80'} text-sm`}>
                © 2025 Impact360. All Rights Reserved.
              </p>
              <p className={`${darkMode ? 'text-gray-500' : 'text-[#FFFEF9]/60'} text-xs mt-1`}>
                Building Africa's Entrepreneurial Future
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`${
                    darkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-[#FFFEF9]/80 hover:text-[#FFFEF9]'
                  } transition-colors text-xs`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <p className={`text-center mt-6 ${darkMode ? 'text-gray-500' : 'text-[#FFFEF9]/60'} text-xs`}>
            Made with ❤️ by Impact360
          </p>
        </div>
      </div>
    </footer>
  );
}