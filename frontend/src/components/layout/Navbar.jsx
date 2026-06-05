import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass rounded-none border-t-0 border-x-0 border-b-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-neon-purple/10 rounded-xl group-hover:bg-neon-purple/20 transition-colors">
            <BarChart3 className="w-6 h-6 text-neon-purple" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight gradient-text">
            InstaAnaliz
          </span>
        </Link>

        <div className="flex items-center">
          <Link to="/analyze">
            <NeonButton size="sm">Analiz Et</NeonButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
