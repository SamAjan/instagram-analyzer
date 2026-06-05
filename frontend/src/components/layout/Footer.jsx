import React from 'react';
import HorizontalAd from '../ads/HorizontalAd';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0d14] border-t border-white/5 py-12 mt-20 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <HorizontalAd />
        </div>
        
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-slate-400 font-medium mb-4">
            Bu analiz sistemi bir <a href="https://www.instagram.com/sosyalsam/" target="_blank" rel="noopener noreferrer" className="text-neon-purple font-bold hover:underline hover:text-white transition-colors">@sosyalsam</a> projesidir.
          </p>
          

          
          <p className="text-slate-600 text-xs mt-8">
            © {new Date().getFullYear()} InstaAnaliz. Tüm hakları saklıdır. Bu platform Instagram'ın resmi bir parçası değildir.
          </p>
        </div>
      </div>
    </footer>
  );
}
