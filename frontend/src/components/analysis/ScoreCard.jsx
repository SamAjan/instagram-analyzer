import React from 'react';
import { motion } from 'framer-motion';
import CircularProgress from './CircularProgress';
import AnimatedCounter from '../ui/AnimatedCounter';
import GlassCard from '../ui/GlassCard';

export default function ScoreCard({ title, score, label, color, icon: Icon, delay = 0 }) {
  const colors = {
    green: '#10b981',
    cyan: '#06b6d4',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444'
  };

  const activeColor = colors[color] || colors.cyan;

  return (
    <GlassCard 
      animate 
      delay={delay}
      className="p-6 flex flex-col items-center justify-center text-center"
    >
      <div className="mb-4">
        <CircularProgress value={score.score || score} size={100} strokeWidth={8} color={activeColor} showLabel={false} />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-display font-bold mt-[-24px]">
          <AnimatedCounter end={score.score || score} />
        </div>
      </div>
      
      {Icon && <Icon className="w-6 h-6 mb-2 text-slate-400" />}
      
      <h4 className="text-slate-300 font-medium mb-1">{title}</h4>
      <div 
        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
        style={{ backgroundColor: `${activeColor}20`, color: activeColor }}
      >
        {label || score.label}
      </div>
    </GlassCard>
  );
}
