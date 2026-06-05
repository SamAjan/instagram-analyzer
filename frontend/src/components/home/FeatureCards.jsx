import React from 'react';
import { TrendingUp, Zap, Target } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SquareAd from '../ads/SquareAd';

export default function FeatureCards() {
  const features = [
    {
      icon: TrendingUp,
      title: "Bazı hesaplar neden sürekli büyüyor?",
      desc: "İstikrarlı büyümenin arkasındaki algoritma dinamiklerini ve etkileşim döngülerini keşfedin.",
      color: "text-neon-success",
      glow: "drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
    },
    {
      icon: Zap,
      title: "Bazıları neden anlık viral olup sonra düşüyor?",
      desc: "Yanlış kitleye ulaşan viral içeriklerin hesabınıza verdiği uzun vadeli zararı öğrenin.",
      color: "text-accent-cyan",
      glow: "drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
    },
    {
      icon: Target,
      title: "Algoritma sizi gerçekten doğru kişilere mi gösteriyor?",
      desc: "İzleyici demografinizin ve etkileşim sinyallerinizin nişinizle uyumlu olup olmadığını analiz edin.",
      color: "text-neon-purple",
      glow: "drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard 
                key={index}
                hover 
                animate
                delay={index * 0.1}
                className="p-8 h-full flex flex-col items-start"
              >
                <div className={`p-4 rounded-2xl bg-white/[0.03] mb-6 ${item.color} ${item.glow}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
        
        {/* Ad Space */}
        <div className="lg:col-span-1 mt-6 lg:mt-0 flex justify-center">
          <SquareAd />
        </div>
      </div>
    </section>
  );
}
