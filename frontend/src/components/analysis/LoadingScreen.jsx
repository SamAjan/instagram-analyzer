import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const messages = [
    'Algoritmanız analiz ediliyor…',
    'İzlenme davranışları inceleniyor…',
    'Hedef kitle sinyalleri hesaplanıyor…',
    'İçerik performansı değerlendiriliyor…',
    'Takipçi dönüşüm oranları hesaplanıyor…',
    'Viral potansiyel analiz ediliyor…',
    'Stratejik öneriler hazırlanıyor…'
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev; // Pause at 90% until actual data returns
        return prev + Math.random() * 5;
      });
    }, 500);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-6 flex flex-col items-center">
        
        {/* Spinner */}
        <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/5"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-neon-purple border-t-transparent shadow-neon"
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Rotating Text */}
        <div className="h-16 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg md:text-xl font-display text-slate-300"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-neon-purple to-accent-cyan shadow-neon"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
