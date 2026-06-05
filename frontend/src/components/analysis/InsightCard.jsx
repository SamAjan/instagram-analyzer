import React from 'react';
import GlassCard from '../ui/GlassCard';

export default function InsightCard({ insight, delay = 0 }) {
  const typeColors = {
    positive: 'bg-neon-success shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    warning: 'bg-neon-warning shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    critical: 'bg-neon-danger shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    info: 'bg-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]',
  };

  const borderColor = typeColors[insight.type] || typeColors.info;

  return (
    <GlassCard animate delay={delay} className="relative overflow-hidden pl-6 pr-4 py-5 flex items-start gap-4">
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${borderColor}`}></div>
      
      <div className="text-2xl mt-1 select-none">{insight.icon}</div>
      
      <div className="flex-1">
        <h4 className="text-white font-semibold mb-1 text-base">{insight.title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{insight.description}</p>
      </div>
    </GlassCard>
  );
}
