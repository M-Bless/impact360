import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Clock, Sparkles, Calendar, MapPin, Users, Zap, TrendingUp } from "lucide-react";

export default function Campaign() {
  const navigate = useNavigate();
  const [activeCity, setActiveCity] = useState(0);
  const [showQR, setShowQR] = useState(false);
  
  const cityStops = [
    { name: "Mombasa", date: "Coming Soon", spots: "Limited", status: "upcoming" },
    { name: "Kisumu", date: "Coming Soon", spots: "Limited", status: "upcoming" },
    { name: "Eldoret", date: "Coming Soon", spots: "Limited", status: "upcoming" },
    { name: "Nakuru", date: "Coming Soon", spots: "Limited", status: "upcoming" }
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
    }, 3000);

    return () => clearInterval(cityInterval);
  }, []);

  return (
    <div className="bg-[#FFFEF9] min-h-screen" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        
        {/* ---------------- HERO SECTION ---------------- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 pt-12">
          
          {/* POSTER IMAGE */}
          <div className="relative flex justify-center order-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 blur-3xl rounded-full"></div>
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
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Zap className="w-4 h-4" />
              <span style={{ fontFamily: 'League Spartan, sans-serif' }}>MOVING FAST ACROSS KENYA</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-[#000000] mb-6 leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              CATCH US BEFORE
              <span className="block text-[#306CEC]">
                WE MOVE ON
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#000000] mb-4 font-semibold" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Don't Miss Out!
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We're scaling fast, bringing our innovation roadshow closer to you. Each city stop is limited and exclusive — once we move on, the chance is gone.
            </p>

            <button 
              onClick={() => {
                navigate('/subscription');
                window.scrollTo(0, 0);
              }}
              className="bg-[#306CEC] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" 
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              RESERVE YOUR SPOT NOW
            </button>
          </div>
        </div>

        {/* ---------------- CITY ANIMATION SECTION ---------------- */}
        <div className="bg-[#306CEC] rounded-3xl shadow-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
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
                  className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-500 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)]
                  ${activeCity === idx ? 'border-yellow-400 scale-105 bg-white/20' : 'border-white/20'}`}
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
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/90 text-lg mb-6">
                Be among the first to know when we're coming to your city
              </p>
              <button 
                onClick={() => setShowQR(true)}
                className="bg-white text-[#306CEC] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" 
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                GET NOTIFIED FIRST
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- COUNTDOWN SECTION ---------------- */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Clock className="w-4 h-4" />
              <span style={{ fontFamily: 'League Spartan, sans-serif' }}>ROADSHOW LAUNCHES IN</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#000000]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
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
              <div key={item.label} className="bg-[#306CEC] rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-white/80 text-sm font-semibold uppercase tracking-wide" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
            <p className="text-center text-red-700 font-bold text-lg">
              ⚡ Register now to secure priority access when dates are announced!
            </p>
          </div>
        </div>

        {/* ---------------- FINAL CTA ---------------- */}
        <div className="bg-[#306CEC] rounded-3xl shadow-2xl p-8 md:p-16 text-center">
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
            className="bg-white text-[#306CEC] px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300" 
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
    </div>
  );
}