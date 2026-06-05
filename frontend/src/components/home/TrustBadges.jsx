import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function TrustBadges() {
  const badges = [
    { icon: Shield, text: "Instagram şifresi istenmez." },
    { icon: Lock, text: "Verileriniz kaydedilmez." },
    { icon: CheckCircle2, text: "Analiz işlemi güvenlidir." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4 mt-12">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <GlassCard 
            key={index}
            animate
            delay={0.5 + (index * 0.1)}
            className="flex items-center justify-center gap-3 p-4 bg-white/[0.02]"
          >
            <Icon className="w-5 h-5 text-neon-success drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-sm font-medium text-slate-300">{badge.text}</span>
          </GlassCard>
        );
      })}
    </div>
  );
}
