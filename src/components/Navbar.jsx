import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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

  // Check if current page should have solid background
  const shouldHaveSolidBg = () => {
    const pagesWithSolidBg = ['/about', '/programs', '/events', '/subscription'];
    return pagesWithSolidBg.includes(location.pathname);
  };

  // Determine navbar background
  const getNavbarBg = () => {
    if (shouldHaveSolidBg()) {
      return 'bg-black/80 backdrop-blur-lg shadow-lg';
    }
    return scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent';
  };

  // Scroll to section on homepage
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    
    if (sectionId === 'Join Community') {
      setShowQR(true);
      return;
    }
    
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Join Our Community</h2>
              <p className="text-gray-600">Scan the QR code to join our WhatsApp community</p>
              <div className="bg-gray-100 p-8 rounded-2xl flex items-center justify-center">
                <img 
                  src="/frame.png" 
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-sm text-gray-500">Or click below to join directly</p>
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

      {/* NAVBAR - Semi-transparent with backdrop blur */}
      <nav className={`w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${getNavbarBg()}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-all duration-500">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white drop-shadow-lg">Impact360</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white drop-shadow-md">
          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <span>Home</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              <span>About</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/programs" onClick={() => setMenuOpen(false)}>
              <span>Programs</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/programs' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/events" onClick={() => setMenuOpen(false)}>
              <span>Events</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/events' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/subscription" onClick={() => setMenuOpen(false)}>
              <span>Subscription</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/subscription' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md">
            <Link to="/Campaign" onClick={() => setMenuOpen(false)}>
              <span>Campaign</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                location.pathname === '/Campaign' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </li>

          <li 
            onClick={() => scrollToSection('Join Community')}
            className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md"
          >
            <span>Join Community</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-xl font-semibold drop-shadow-lg"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-black/80 backdrop-blur-lg fixed top-12 left-0 right-0 py-4 px-8 space-y-3 text-white text-base font-semibold shadow-2xl z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <p className={`hover:text-white/70 transition cursor-pointer ${
              location.pathname === '/' ? 'text-yellow-400' : ''
            }`}>Home</p>
          </Link>
          
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <p className={`hover:text-white/70 transition cursor-pointer ${
              location.pathname === '/about' ? 'text-yellow-400' : ''
            }`}>About</p>
          </Link>

          <Link to="/programs" onClick={() => setMenuOpen(false)}>
            <p className={`hover:text-white/70 transition cursor-pointer ${
              location.pathname === '/programs' ? 'text-yellow-400' : ''
            }`}>Programs</p>
          </Link>

          <Link to="/events" onClick={() => setMenuOpen(false)}>
            <p className={`hover:text-white/70 transition cursor-pointer ${
              location.pathname === '/events' ? 'text-yellow-400' : ''
            }`}>Events</p>
          </Link>

          <Link to="/subscription" onClick={() => setMenuOpen(false)}>
            <p className={`hover:text-white/70 transition cursor-pointer ${
              location.pathname === '/subscription' ? 'text-yellow-400' : ''
            }`}>Subscription</p>
          </Link>

          <p 
            onClick={() => scrollToSection('Join Community')}
            className="hover:text-white/70 transition cursor-pointer"
          >
            Join Community
          </p>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;





