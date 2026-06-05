import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedProgressBar({ value, label, color = '#a855f7', delay = 0 }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        <span className="text-xs text-white font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}30` }}>
          {value}%
        </span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
