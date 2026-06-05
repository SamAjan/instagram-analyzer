import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeonButton from '../ui/NeonButton';
import TrustBadges from './TrustBadges';
import HorizontalAd from '../ads/HorizontalAd';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none animate-float mix-blend-screen"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm font-medium text-neon-purple">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
            Yapay Zeka Destekli Analiz Motoru
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-8 leading-[1.1]">
            Instagram Hesabın<br className="hidden md:block" /> Gerçekten <span className="gradient-text">Sağlıklı mı Büyüyor?</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance">
            Bazı videolar izleniyor olabilir. Ama algoritma gerçekten seni doğru kitleye mi taşıyor? Bu analiz sistemi; görüntülenme, takipçi dönüşümü, izlenme davranışı ve içerik yapını analiz ederek hesabının neden büyüdüğünü veya neden yavaşladığını ortaya çıkarır.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeonButton 
              size="lg" 
              icon={ArrowRight} 
              onClick={() => navigate('/analyze')}
              className="w-full sm:w-auto"
            >
              Hesabımı Analiz Et
            </NeonButton>
          </div>
        </motion.div>

        <TrustBadges />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-24 px-4 z-10">
        <HorizontalAd />
      </div>
    </div>
  );
}
