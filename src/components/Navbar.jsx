import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages that should always have solid navbar
  const pagesWithSolidBg = [
    "/about",
    "/programs",
    "/subscription",
  ];

  // Navbar Background logic
  const getNavbarBg = () => {
    if (pagesWithSolidBg.includes(location.pathname)) {
      return "bg-white dark:bg-[#1a1f3a] shadow-lg";
    }
    return scrolled ? "bg-white dark:bg-[#1a1f3a] shadow-lg" : "bg-transparent";
  };

  // Scroll to section on homepage
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);

    if (sectionId === "Join Community") {
      setShowQR(true);
      return;
    }

    const element = document.getElementById(
      sectionId.toLowerCase().replace(/\s+/g, "-")
    );

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* WhatsApp QR Code Modal */}
      {showQR && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQR(false)}
        >
          <motion.div
            className="bg-white dark:bg-[#1a1f3a] rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Join Our Community
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Scan the QR code to join our WhatsApp community
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-2xl flex items-center justify-center">
                <img
                  src="/frame.png"
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Or click below to join</p>
              <a
                href="https://chat.whatsapp.com/I0g8kpCNvSn84yWQxybzHa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all duration-300"
              >
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* NAVBAR */}
      <nav
        className={`w-full flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50 py-2 md:py-3 transition-all duration-300 ${getNavbarBg()}`}
        style={{ minHeight: "72px" }} // Ensures consistent navbar height
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 transition-all duration-500"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img
              src="/logo2.png"
              alt="Impact360 Logo"
              className="w-full h-full object-contain drop-shadow-lg rounded-full"
            />
          </div>
          <span
            className={`text-xl md:text-2xl font-bold tracking-wide flex items-center ${
              scrolled || pagesWithSolidBg.includes(location.pathname)
                ? "text-black dark:text-white"
                : "text-white"
            }`}
            style={{ lineHeight: 1 }}
          >
            Impact360
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul
            className={`flex gap-8 font-semibold text-sm transition-all duration-300 items-center ${
              scrolled || pagesWithSolidBg.includes(location.pathname)
                ? "text-black dark:text-white"
                : "text-white"
            }`}
          >
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Programs", path: "/programs" },
              { name: "Events", path: "/events" },
              { name: "Subscription", path: "/subscription" },
            ].map((item) => (
              <li key={item.name} className="relative group cursor-pointer">
                <Link to={item.path}>
                  <span>{item.name}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                      location.pathname === item.path
                        ? `w-full ${scrolled || pagesWithSolidBg.includes(location.pathname)
                            ? "bg-black dark:bg-white"
                            : "bg-white"}`
                        : "w-0 group-hover:w-full bg-black dark:group-hover:bg-white"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}

            <li
              onClick={() => scrollToSection("Join Community")}
              className="relative group cursor-pointer"
            >
              <span>Join Community</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#306CEC] group-hover:w-full transition-all duration-300"></span>
            </li>
          </ul>

          {/* Dark Mode Toggle */}
          <div className="ml-4 flex items-center">
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Menu Button & Dark Mode */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className={`text-3xl font-bold ${
              scrolled || pagesWithSolidBg.includes(location.pathname)
                ? "text-black dark:text-white"
                : "text-white"
            }`}
            style={{ lineHeight: 1 }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU - CENTERED PANEL */}
      {menuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1a1f3a] w-80 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col gap-4 text-lg font-semibold text-black dark:text-white">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/programs" onClick={() => setMenuOpen(false)}>Programs</Link>
              <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
              <Link to="/subscription" onClick={() => setMenuOpen(false)}>Subscription</Link>

              <p
                onClick={() => scrollToSection("Join Community")}
                className="cursor-pointer text-[#306CEC] dark:text-blue-400"
              >
                Join Community
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
