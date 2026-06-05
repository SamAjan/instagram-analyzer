import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Users, Zap } from 'lucide-react';
import ScoreCard from './ScoreCard';
import CircularProgress from './CircularProgress';
import InsightCard from './InsightCard';
import PremiumLocked from './PremiumLocked';
import HorizontalAd from '../ads/HorizontalAd';
import InlineContentAd from '../ads/InlineContentAd';

export default function ResultsDashboard({ results }) {
  if (!results) return null;

  const { username, niche, summary, scores, insights } = results;

  // Stagger animation container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto space-y-12 pb-20"
    >
      {/* Header */}
      <motion.div 
        variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row items-center justify-between bg-[#111118] border border-white/5 rounded-3xl p-6 md:p-8"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3">
            {username} 
            <span className="text-sm font-medium px-3 py-1 bg-white/10 text-slate-300 rounded-full border border-white/5">
              {niche}
            </span>
          </h2>
          <p className="text-slate-400 mt-2">Analiz tarihi: {new Date().toLocaleDateString('tr-TR')} {new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-slate-400 mb-1">Hesap Sağlığı</p>
            <p className={`text-xl font-bold ${summary.score >= 60 ? 'text-neon-success' : summary.score >= 40 ? 'text-neon-warning' : 'text-neon-danger'}`}>
              {summary.status}
            </p>
          </div>
          <CircularProgress 
            value={summary.overallHealth.score} 
            size={80} 
            strokeWidth={6} 
            color={summary.overallHealth.score >= 60 ? '#10b981' : summary.overallHealth.score >= 40 ? '#f59e0b' : '#ef4444'} 
            showLabel={true} 
          />
        </div>
      </motion.div>

      {/* 4 Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard 
          title="İçerik Skoru" 
          score={scores.contentScore} 
          icon={Activity} 
          delay={0.1} 
        />
        <ScoreCard 
          title="Algoritma Skoru" 
          score={scores.algorithmScore} 
          icon={Target} 
          delay={0.2} 
        />
        <ScoreCard 
          title="Takipçi Dönüşüm" 
          score={scores.followerConversionScore} 
          icon={Users} 
          delay={0.3} 
        />
        <ScoreCard 
          title="Viral Potansiyel" 
          score={scores.viralPotentialScore} 
          icon={Zap} 
          delay={0.4} 
        />
      </div>

      <HorizontalAd />

      {/* Insights Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Zap className="text-neon-purple w-6 h-6" />
          <h3 className="text-2xl font-display font-bold text-white">Teşhis & Bulgular</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <InsightCard 
              key={index} 
              insight={insight} 
              delay={0.2 + (index * 0.1)} 
            />
          ))}
        </div>
      </div>

      <InlineContentAd />

      {/* Premium Section */}
      <PremiumLocked />
      
    </motion.div>
  );
}
