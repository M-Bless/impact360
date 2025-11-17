import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 text-center text-[#FFFEF9]/90 bg-[#306CEC] border-t border-[#FFFEF9]/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFFEF9] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="/logo4.png" 
                alt="Impact360 Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-[#FFFEF9]">Impact360</span>
          </div>
        </motion.div>
        
        <p className="text-[#FFFEF9] font-semibold text-lg">
          © 2025 Impact360. All Rights Reserved.
        </p>
        <p className="mt-2 text-sm text-[#FFFEF9]/70">Building Africa's Entrepreneurial Future 🚀</p>
      </div>
    </footer>
  );
}