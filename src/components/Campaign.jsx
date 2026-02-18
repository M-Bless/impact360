import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../DarkModeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Code2, Smartphone, Cloud, Brain, ArrowRight, Play, Building2, Users, TrendingUp, Wrench } from "lucide-react";

export default function Campaign() {
  const { darkMode } = useDarkMode();
  const [hoveredCard, setHoveredCard] = useState(null);

  const techTracks = [
    {
      id: 0,
      name: "Web Development",
      icon: Code2,
      description: "React • Node.js • Tailwind CSS",
      fullDesc: "Build production-ready web applications with modern frameworks and tools.",
      bgColor: darkMode ? "#1a2d4d" : "#f3f7ff",
      borderColor: "#306CEC"
    },
    {
      id: 1,
      name: "Mobile Development",
      icon: Smartphone,
      description: "React Native • Flutter • iOS",
      fullDesc: "Create powerful mobile apps that work across all platforms.",
      bgColor: darkMode ? "#2d1a4d" : "#faf3ff",
      borderColor: "#9333ea"
    },
    {
      id: 2,
      name: "Cloud & DevOps",
      icon: Cloud,
      description: "AWS • Docker • Kubernetes",
      fullDesc: "Deploy and scale applications with cloud infrastructure.",
      bgColor: darkMode ? "#4d2a1a" : "#fff9f3",
      borderColor: "#ea580c"
    },
    {
      id: 3,
      name: "AI/ML & Data",
      icon: Brain,
      description: "Python • TensorFlow • Models",
      fullDesc: "Build intelligent systems powered by machine learning.",
      bgColor: darkMode ? "#4d1a2d" : "#fff3f7",
      borderColor: "#ec4899"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">

        {/* ================= HERO SECTION ================= */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className={`inline-block mb-6 px-4 py-2 rounded-lg text-sm font-bold ${
                darkMode ? 'bg-gray-900 text-blue-400' : 'bg-blue-50 text-gray-900'
              }`}>
                FOR TECH PROFESSIONALS
              </div>

              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                darkMode ? 'text-white' : 'text-gray-950'
              }`} style={{ fontFamily: 'League Spartan, sans-serif', lineHeight: '1.2' }}>
                Build your tech skills, <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>one project at a time</span>
              </h1>

              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Master essential technologies through real-world projects. Learn from experts, build your portfolio, and launch your tech career with Impact360 OS.
              </p>

              <a
                href="https://impact360-os.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-4 font-bold text-lg rounded-lg transition-all ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right - Simple Visual */}
            <div className="flex items-center justify-center">
              <div className={`relative w-full h-80 rounded-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
              } flex items-center justify-center border ${
                darkMode ? 'border-gray-700' : 'border-gray-300'
              } overflow-hidden`}>
                <img
                  src="https://i.pinimg.com/736x/f5/e8/72/f5e87230f73c9811d9f9a69feb392b5a.jpg"
                  alt="Impact360 OS Skills"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= TECH TRACKS SECTION ================= */}
        <div className="mb-24">
          <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-950'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Learning Paths
          </h2>
          <p className={`text-lg mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose one or explore multiple tracks
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techTracks.map((track) => {
              const IconComponent = track.icon;
              return (
                <motion.div
                  key={track.id}
                  onMouseEnter={() => setHoveredCard(track.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    hoveredCard === track.id
                      ? `border-blue-600 shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`
                      : `border-gray-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <IconComponent className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {track.name}
                      </h3>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {track.description}
                      </p>
                    </div>
                  </div>

                  <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {hoveredCard === track.id ? track.fullDesc : track.description}
                  </p>

                  {hoveredCard === track.id && (
                    <a
                      href="https://impact360-os.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4" fill="currentColor" /> Explore track
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://impact360-os.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-lg bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-all"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              VIEW ALL PATHS <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ================= FEATURES SECTION ================= */}
        <div className="mb-24">
          <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-950'}`} style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Why Impact360 OS
          </h2>
          <p className={`text-lg mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            What makes us different
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Real Projects', desc: 'Build portfolio pieces' },
              { icon: Users, title: 'Expert Mentors', desc: 'Learn from professionals' },
              { icon: TrendingUp, title: 'Career Growth', desc: 'Land better opportunities' },
              { icon: Wrench, title: 'Hands-On', desc: 'Learn by doing' }
            ].map((feature, idx) => (
              <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-950 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
                <feature.icon className={`w-8 h-8 mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FINAL CTA ================= */}
        <div className={`rounded-2xl p-12 md:p-16 text-center border-2 ${
          darkMode
            ? 'bg-gray-950 border-gray-800'
            : 'bg-gray-900 border-gray-800 text-white'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Ready to start?
          </h2>

          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join thousands of professionals building their tech careers. Start learning today.
          </p>

          <a
            href="https://impact360-os.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            START NOW <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
