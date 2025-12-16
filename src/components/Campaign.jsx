import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Clock, Sparkles, Calendar, MapPin, Users, Zap, TrendingUp } from "lucide-react";

export default function Campaign() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [activeCity, setActiveCity] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const cityStops = [
    { name: "Nakuru", date: "Coming Soon", spots: "Limited", status: "upcoming", hasTrailer: true },
    { name: "Naivasha", date: "Coming Soon", spots: "Limited", status: "upcoming", hasTrailer: false },
    { name: "Mombasa", date: "Coming Soon", spots: "Limited", status: "upcoming", hasTrailer: false },
    { name: "Kisumu", date: "Coming Soon", spots: "Limited", status: "upcoming", hasTrailer: false },
    { name: "Eldoret", date: "Coming Soon", spots: "Limited", status: "upcoming", hasTrailer: false }
  ];

  /* ============================
        FIXED COUNTDOWN LOGIC
     ============================ */
  const targetDate = new Date("2026-02-14T00:00:00+03:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ============================
        CITY ANIMATION LOGIC
     ============================ */
  useEffect(() => {
    const cityInterval = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cityStops.length);
    }, 4000);

    return () => clearInterval(cityInterval);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${darkMode ? 'bg-gray-900' : 'bg-[#FFFEF9]'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        
        {/* ---------------- HERO SECTION ---------------- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 pt-12">
          
          {/* POSTER IMAGE */}
          <div className="relative flex justify-center order-1">
            <div className={`absolute inset-0 rounded-full blur-3xl ${darkMode ? 'bg-gradient-to-tr from-blue-600/20 to-purple-600/20' : 'bg-gradient-to-tr from-blue-400/20 to-purple-400/20'}`}></div>
            <div className="relative group">
              <img
                src={"/roadshow.png"}
                alt="Innovation Roadshow"
                className="w-full max-w-lg rounded-3xl shadow-2xl object-cover transform transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
                <TrendingUp className="inline w-5 h-5 mr-2" />
                <span className="font-bold">Don't Miss Out!</span>
              </div>
            </div>
          </div>

          {/* HERO TEXT */}
          <div className="order-2">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 animate-pulse ${
              darkMode
                ? 'bg-red-900/40 text-red-300'
                : 'bg-red-100 text-red-600'
            }`}>
              <Zap className="w-4 h-4" />
              <span style={{ fontFamily: 'League Spartan, sans-serif' }}>MOVING FAST ACROSS KENYA</span>
            </div>

            <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-[#000000]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              CATCH US BEFORE
              <span className={`block ${darkMode ? 'text-blue-400' : 'text-[#306CEC]'}`}>
                WE MOVE ON
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-[#000000]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Don't Miss Out!
            </p>
            
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              We're scaling fast, bringing our innovation roadshow closer to you. Each city stop is limited and exclusive — once we move on, the chance is gone.
            </p>

            <button 
              onClick={() => {
                navigate('/subscription');
                window.scrollTo(0, 0);
              }}
              className={`text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#306CEC] hover:bg-[#1a4d9e]'
              }`}
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              RESERVE YOUR SPOT NOW
            </button>
          </div>
        </div>

        {/* ---------------- CITY ANIMATION SECTION ---------------- */}
        <div className={`rounded-3xl shadow-2xl p-8 md:p-12 mb-16 relative overflow-hidden transition-colors duration-1000 ${
          darkMode ? 'bg-blue-700' : 'bg-[#306CEC]'
        }`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                OUR JOURNEY ACROSS KENYA
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {cityStops.map((city, idx) => (
                <div
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowTrailer(true);
                  }}
                  className={`relative backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-500 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)] cursor-pointer hover:bg-white/30 hover:scale-105 hover:shadow-2xl group
                  ${activeCity === idx ? 'border-yellow-400 scale-105 bg-white/20' : 'border-white/20 bg-white/10'}`}
                >
                  {activeCity === idx && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  )}

                  <MapPin className={`w-8 h-8 mb-3 ${activeCity === idx ? 'text-yellow-400 scale-110' : 'text-white'}`} />
                  
                  <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                  <p className="text-blue-100 text-sm font-semibold">{city.date}</p>

                  <div className="mt-3 inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
                    <Users className="w-3 h-3" />
                    {city.spots} Spots
                  </div>

                  {/* Click indicator - appears on hover */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>Click to view</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/90 text-lg mb-2">
                Click on any city to see what's coming
              </p>
              <p className="text-white/70 text-sm mb-6">
                Be among the first to know when we're coming to your city
              </p>
              <button 
                onClick={() => setShowQR(true)}
                className={`text-[#306CEC] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
                  darkMode ? 'bg-gray-100 hover:bg-white' : 'bg-white hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                GET NOTIFIED FIRST
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- COUNTDOWN SECTION ---------------- */}
        <div className={`rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border transition-colors duration-1000 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${
              darkMode
                ? 'bg-red-900/40 text-red-300'
                : 'bg-red-100 text-red-600'
            }`}>
              <Clock className="w-4 h-4" />
              <span style={{ fontFamily: 'League Spartan, sans-serif' }}>ROADSHOW LAUNCHES IN</span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#000000]'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
              FIRST STOP ANNOUNCEMENT COMING SOON
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl p-6 text-center shadow-lg transition-colors duration-1000 ${
                darkMode ? 'bg-blue-600' : 'bg-[#306CEC]'
              }`}>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-white/80 text-sm font-semibold uppercase tracking-wide" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-xl p-6 border-2 transition-colors duration-1000 ${
            darkMode
              ? 'bg-red-900/20 border-red-700/40'
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
          }`}>
            <p className={`text-center font-bold text-lg ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
              ⚡ Register now to secure priority access when dates are announced!
            </p>
          </div>
        </div>

        {/* ---------------- FINAL CTA ---------------- */}
        <div className={`rounded-3xl shadow-2xl p-8 md:p-16 text-center transition-colors duration-1000 ${
          darkMode ? 'bg-blue-700' : 'bg-[#306CEC]'
        }`}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            WILL YOU BE PART OF THE JOURNEY?
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be among the first to connect, engage, and enjoy what the Innovation Roadshow has to offer in your city
          </p>
          
          <button 
            onClick={() => {
              navigate('/subscription');
              window.scrollTo(0, 0);
            }}
            className={`text-[#306CEC] px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 ${
              darkMode ? 'bg-gray-100 hover:bg-white' : 'bg-white hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            RESERVE YOUR SPOT NOW
          </button>
        </div>
      </div>

      <Footer />

      {/* WhatsApp QR Code Modal */}
      {showQR && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQR(false)}
        >
          <motion.div
            className={`rounded-3xl p-8 max-w-md w-full relative shadow-2xl transition-colors duration-1000 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className={`absolute top-4 right-4 text-2xl font-bold ${
                darkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join Our Community</h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Scan the QR code to join our WhatsApp community</p>
              <div className={`p-8 rounded-2xl flex items-center justify-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <img 
                  src="/frame.png" 
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Or click below to join directly</p>
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

      {/* City Trailer Modal */}
      {showTrailer && selectedCity && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full relative shadow-2xl border my-4 sm:my-8 max-h-[95vh] overflow-y-auto transition-colors duration-1000 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800'
                : 'bg-gradient-to-br from-gray-900 to-black border-gray-800'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white text-xl sm:text-2xl font-bold z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center ${
                darkMode ? 'hover:text-gray-200' : 'hover:text-gray-200'
              }`}
            >
              ×
            </button>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold mb-1 sm:mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedCity.name} Roadshow</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  COMING TO {selectedCity.name.toUpperCase()}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">Get ready for an unforgettable experience</p>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                {selectedCity.hasTrailer ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    src="./trailer (1).mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-400 mb-3 sm:mb-4 animate-pulse" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      COMING SOON
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 text-center px-4 sm:px-6">
                      The trailer for {selectedCity.name} is coming soon. Stay tuned!
                    </p>
                  </div>
                )}
              </div>

              {/* City Info */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-white/10">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 mb-1 sm:mb-2" />
                  <p className="text-gray-400 text-[10px] sm:text-xs">Launch Date</p>
                  <p className="text-white font-bold text-xs sm:text-sm">{selectedCity.date}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-white/10">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 mb-1 sm:mb-2" />
                  <p className="text-gray-400 text-[10px] sm:text-xs">Available Spots</p>
                  <p className="text-white font-bold text-xs sm:text-sm">{selectedCity.spots}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowTrailer(false);
                  navigate('/subscription');
                  window.scrollTo(0, 0);
                }}
                className="w-full bg-[#306CEC] text-white px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                RESERVE YOUR SPOT NOW
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}