import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const photos = [
    "/photo_1.jpg",
    "/photo_2.jpg",
    "/photo_3.jpg",
    "/photo_4.jpg",
    "/photo_5.jpg",
    "/photo_6.jpg"
  ];
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000); // Change photo every 5 seconds
    return () => clearInterval(interval);
  }, []);
  
  // Detect scroll to hide navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Navigation handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    
    <div className="font-sans">
      {/* NAVBAR - Semi-transparent with backdrop blur */}
      <nav className="w-full flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 transition-all duration-500">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/logo2.png" 
              alt="Impact360 Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white drop-shadow-lg">Impact360</h1>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-semibold text-sm text-white drop-shadow-md">

          {["Home", "About", "Programs", "Events", "Contact"].map((item) => (
            <li 
              key={item} 
              onClick={() => scrollToSection(item)}
              className="cursor-pointer hover:text-white/70 transition-all duration-300 relative group drop-shadow-md"
            >
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
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
          {["Home", "About", "Programs", "Events", "Contact", "Join Community"].map((item) => (
            <p 
              key={item}
              onClick={() => scrollToSection(item)}
              className="hover:text-white/70 transition cursor-pointer"
            >
              {item}
            </p>
          ))}
        </motion.div>
      )}
      
      {/* HERO SECTION */}
      <section  id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Photo Slideshow Background */}
        <div className="absolute inset-0">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${photo})`,
                zIndex: currentPhoto === index ? 2 : 1
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentPhoto === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 z-3" />
          {/* Gradient overlay for extra depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-3" />
        </div>
        
        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPhoto === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  <span className="block text-white drop-shadow-2xl">
                    Empowering
                  </span>
                  <span className="block text-white drop-shadow-2xl">
                    Innovation for
                  </span>
                  <span className="block text-white drop-shadow-2xl">
                    Real-World Impact
                  </span>
                </h1>
              </motion.div>
              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-white/95 drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Transform your ideas into sustainable, scalable solutions with our global-standard innovation pipeline.
              </motion.p>
              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={() => scrollToSection('About')}
                  className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('Join Community')}
                  className="bg-[#306CEC] text-white px-10 py-4 rounded-full font-bold shadow-2xl text-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Join Community</span>
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[#306CEC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-bold">
                    Join Community
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right Side - Interactive Logo Display */}
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Floating animated cards with logos */}
                <div className="relative h-[500px] flex items-center justify-center">
                  {/* Center large logo */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1, 0.8],
                      opacity: [0, 1, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5]
                    }}
                  >
                    <div className="w-64 h-64 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex items-center justify-center p-8">
                      <img 
                        src="/logo2.png" 
                        alt="Impact360 Logo" 
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Second logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0.8, 1, 0.8, 0, 0],
                      opacity: [0, 0, 0, 1, 0, 0, 0],
                      rotate: [0, 0, 0, -5, 0, 0, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.25, 0.35, 0.5, 0.65, 0.75, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-black backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center p-8">
                      <img 
                        src="/logo3.png" 
                        alt="Impact360 White Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Third logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0, 0, 0.8, 1, 0.8, 0],
                      opacity: [0, 0, 0, 0, 0, 1, 0, 0],
                      rotate: [0, 0, 0, 0, 0, 3, 0, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.4, 0.5, 0.6, 0.65, 0.75, 0.85, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-[#306CEC] backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center p-8">
                      <img 
                        src="/logo4.png" 
                        alt="Impact360 White on Blue Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Fourth logo variant */}
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0, 0, 0, 0, 0, 0, 0.8, 1],
                      opacity: [0, 0, 0, 0, 0, 0, 0, 1],
                      rotate: [0, 0, 0, 0, 0, 0, 0, -3]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 1]
                    }}
                  >
                    <div className="w-64 h-64 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex items-center justify-center p-8">
                      <img 
                        src="/logo5.png" 
                        alt="Impact360 Black Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Orbiting particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${i % 2 === 0 ? '#306CEC' : '#FFFFFF'}, transparent)`,
                        filter: 'blur(1px)'
                      }}
                      animate={{
                        x: [0, Math.cos((i * Math.PI) / 4) * 200, 0],
                        y: [0, Math.sin((i * Math.PI) / 4) * 200, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 15 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </div>
  );
}