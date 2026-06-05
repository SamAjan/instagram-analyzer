import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Calendar, TrendingUp } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';

export default function PremiumLocked() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative mt-12 w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/5 bg-[#111118]">
      {/* Blurred background content */}
      <div className="p-8 filter blur-md opacity-50 pointer-events-none select-none">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
          <div>
            <div className="h-5 w-48 bg-white/20 rounded mb-2"></div>
            <div className="h-4 w-32 bg-white/10 rounded"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl h-32 flex flex-col justify-between">
              <div className="h-4 w-2/3 bg-white/10 rounded"></div>
              <div className="h-8 w-1/3 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl h-48">
          <div className="h-4 w-1/4 bg-white/20 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-3 w-full bg-white/10 rounded"></div>
            <div className="h-3 w-5/6 bg-white/10 rounded"></div>
            <div className="h-3 w-4/6 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-black/40">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md w-full bg-[#111118]/80 backdrop-blur-xl border border-neon-purple/30 p-8 rounded-3xl shadow-neon flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center mb-6 text-neon-purple">
            <Lock className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Stratejik Analiz Raporu
          </h3>
          
          <p className="text-slate-300 mb-8 leading-relaxed">
            Sadece sorunu değil, çözümü de öğren. Algoritmayı kendi lehine çevirecek eylem planı, içerik takvimi ve büyüme stratejisi.
          </p>

          <div className="space-y-4 w-full mb-8 text-left">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <FileText className="w-4 h-4 text-accent-cyan" /> Özel İçerik Reçetesi
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <Calendar className="w-4 h-4 text-neon-success" /> 30 Günlük Aksiyon Planı
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <TrendingUp className="w-4 h-4 text-neon-warning" /> Viral Kanca (Hook) Stratejileri
            </div>
          </div>

          <NeonButton 
            size="lg" 
            fullWidth 
            icon={Lock}
            onClick={() => setShowModal(true)}
          >
            Kilitli Stratejik Analizi Aç
          </NeonButton>
        </motion.div>
      </div>

      {/* Fake Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111118] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-cyan">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Çok Yakında!</h3>
              <p className="text-slate-400 mb-6">
                Premium strateji raporu altyapımız şu an geliştirme aşamasındadır. İlginiz için teşekkür ederiz.
              </p>
              <NeonButton variant="secondary" fullWidth onClick={() => setShowModal(false)}>
                Anladım
              </NeonButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Add this missing import that I used inside the modal
import { Sparkles } from 'lucide-react';
