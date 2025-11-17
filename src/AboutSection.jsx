import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-[#FFFEF9] text-[#306CEC] py-24 px-8 md:px-20 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#306CEC]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        <motion.div 
          className="inline-block mb-8"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-[#306CEC] flex items-center justify-center shadow-xl">
            <span className="text-5xl">🚀</span>
          </div>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-[#306CEC]">
          About Impact360
        </h2>

        <motion.p
          className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-[#306CEC]/80 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Impact360 is a growth and innovation company shaping Africa's entrepreneurial landscape through structure, community, and execution. We empower founders, startups, and changemakers to move from ideas to scalable ventures by providing the systems, knowledge, and support they need to build and grow.
        </motion.p>
        
        <motion.p
          className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed font-bold text-[#000000]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          At Impact360, we believe real impact happens when ideas meet discipline, collaboration, and the right environment to thrive.
        </motion.p>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "💡", title: "Innovation", desc: "Transform ideas into reality with cutting-edge tools" },
            { icon: "🤝", title: "Community", desc: "Connect with Africa's top changemakers" },
            { icon: "📈", title: "Growth", desc: "Scale your ventures with proven frameworks" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#306CEC] text-[#FFFEF9] p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#000000]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="text-6xl mb-6 relative z-10">{item.icon}</div>
              <h3 className="text-3xl font-bold text-[#FFFEF9] mb-3 relative z-10">{item.title}</h3>
              <p className="text-[#FFFEF9]/90 text-lg relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}