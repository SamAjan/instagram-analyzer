import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function HorizontalAd({ className = '' }) {
  const containerRef = useRef(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1 });
  const [adFailed, setAdFailed] = useState(false);
  const adInitialized = useRef(false);

  useEffect(() => {
    if (isVisible && !adInitialized.current) {
      adInitialized.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        setAdFailed(true);
      }
      
      setTimeout(() => {
        if (containerRef.current) {
          const adEl = containerRef.current.querySelector('ins');
          if (adEl && adEl.getAttribute('data-ad-status') === 'unfilled') {
            setAdFailed(true);
          }
        }
      }, 3000);
    }
  }, [isVisible]);

  if (adFailed) return null;

  return (
    <div ref={containerRef} className={`bg-white/[0.02] rounded-[20px] p-4 min-h-[100px] flex flex-col justify-center items-center text-center overflow-hidden w-full ${className}`}>
      <p className="text-[10px] text-white/20 mb-2 tracking-widest uppercase self-start ml-2">Sponsorlu</p>
      <ins 
        className="adsbygoogle" 
        style={{ display: 'block', width: '100%' }} 
        data-ad-client="ca-pub-3595165180004646" 
        data-ad-slot="4679531820" 
        data-ad-format="auto" 
        data-full-width-responsive="true" 
      />
    </div>
  );
}
