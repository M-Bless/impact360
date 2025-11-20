import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section 
      id="about"
      className="min-h-screen bg-gradient-to-br from-[#FFFEF9] via-[#f8f7f0] to-[#FFFEF9] text-[#306CEC] py-32 px-8 md:px-20 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#306CEC]/3 rounded-full blur-2xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-block mb-8"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#306CEC] to-[#4c8aff] flex items-center justify-center shadow-2xl shadow-[#306CEC]/30">
              <span className="text-6xl">🚀</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#306CEC] to-[#1a4d9e] bg-clip-text text-transparent">
              About Impact360
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#306CEC] to-transparent mx-auto mb-8"></div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left Side - Text */}
          <div className="space-y-8">
            <motion.p
              className="text-2xl md:text-3xl leading-relaxed text-[#306CEC] font-light"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Impact360 is a <span className="font-bold text-[#1a4d9e]">growth and innovation company</span> shaping Africa's entrepreneurial landscape through structure, community, and execution.
            </motion.p>
            
            <motion.p
              className="text-xl leading-relaxed text-[#306CEC]/80"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              We empower founders, startups, and changemakers to move from ideas to scalable ventures by providing the systems, knowledge, and support they need to build and grow.
            </motion.p>
            
            <motion.div
              className="bg-gradient-to-br from-[#306CEC] to-[#4c8aff] p-8 rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(48, 108, 236, 0.3)" }}
            >
              <p className="text-2xl leading-relaxed font-bold text-[#FFFEF9]">
                "Real impact happens when ideas meet discipline, collaboration, and the right environment to thrive."
              </p>
            </motion.div>
          </div>
          
          {/* Right Side - Visual Element */}
          <motion.div
            className="relative h-96"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Concentric circles */}
              {[1, 2, 3, 4].map((ring, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-[#306CEC]/20"
                  style={{
                    width: `${ring * 80}px`,
                    height: `${ring * 80}px`
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Center icon */}
              <motion.div
                className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#306CEC] to-[#4c8aff] flex items-center justify-center shadow-2xl"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className="text-6xl">💡</span>
              </motion.div>
              
              {/* Orbiting elements */}
              {["🎯", "🌍", "⚡", "🔥"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 rounded-full bg-[#FFFEF9] shadow-xl flex items-center justify-center border-2 border-[#306CEC]/20"
                  animate={{
                    x: [
                      Math.cos((i * 90 * Math.PI) / 180) * 140,
                      Math.cos(((i * 90 + 90) * Math.PI) / 180) * 140,
                      Math.cos(((i * 90 + 180) * Math.PI) / 180) * 140,
                      Math.cos(((i * 90 + 270) * Math.PI) / 180) * 140,
                      Math.cos((i * 90 * Math.PI) / 180) * 140
                    ],
                    y: [
                      Math.sin((i * 90 * Math.PI) / 180) * 140,
                      Math.sin(((i * 90 + 90) * Math.PI) / 180) * 140,
                      Math.sin(((i * 90 + 180) * Math.PI) / 180) * 140,
                      Math.sin(((i * 90 + 270) * Math.PI) / 180) * 140,
                      Math.sin((i * 90 * Math.PI) / 180) * 140
                    ]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span className="text-3xl">{emoji}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { 
              icon: "💡", 
              title: "Innovation", 
              desc: "Transform ideas into reality with cutting-edge tools, frameworks, and mentorship from industry leaders.",
              gradient: "from-[#306CEC] to-[#4c8aff]"
            },
            { 
              icon: "🤝", 
              title: "Community", 
              desc: "Connect with Africa's top changemakers, entrepreneurs, and innovators in a thriving ecosystem.",
              gradient: "from-[#306CEC] to-[#4c8aff]"
            },
            { 
              icon: "📈", 
              title: "Growth", 
              desc: "Scale your ventures with proven frameworks, strategic partnerships, and access to resources.",
              gradient: "from-[#306CEC] to-[#4c8aff]"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br ${item.gradient} text-[#FFFEF9] p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.03 }}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{
                  left: ["-100%", "200%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="text-7xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-4xl font-bold text-[#FFFEF9] mb-4">{item.title}</h3>
                <p className="text-[#FFFEF9]/90 text-lg leading-relaxed">{item.desc}</p>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-tr-full"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "500+", label: "Innovators Empowered", icon: "👥" },
            { number: "50+", label: "Startups Launched", icon: "🚀" },
            { number: "10+", label: "Active Programs", icon: "📚" },
            { number: "5+", label: "Years of Impact", icon: "⭐" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-5xl font-bold text-[#306CEC] mb-2">{stat.number}</div>
              <div className="text-sm text-[#306CEC]/70 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}