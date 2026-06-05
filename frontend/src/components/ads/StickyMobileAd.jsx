import React, { useState } from 'react';
import { X } from 'lucide-react';
import HorizontalAd from './HorizontalAd';

export default function StickyMobileAd() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-safe pt-2 bg-black/80 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute -top-10 right-2 w-8 h-8 bg-black/80 backdrop-blur rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:text-white"
        aria-label="Reklamı Kapat"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="w-full flex justify-center px-2 pb-2">
        <HorizontalAd className="!min-h-[60px] !p-1 !bg-transparent" />
      </div>
    </div>
  );
}
