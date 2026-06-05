import { useState, useEffect } from 'react';

export function useAdBlockDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const detectAdBlock = () => {
      const ad = document.createElement('div');
      ad.className = 'adsbygoogle ad-zone ad-space ad-unit textads banner-ads banner_ads';
      ad.style.display = 'block';
      ad.style.position = 'absolute';
      ad.style.top = '-1000px';
      ad.style.left = '-1000px';
      ad.style.height = '1px';
      ad.style.width = '1px';
      
      document.body.appendChild(ad);
      
      setTimeout(() => {
        const isBlocked = ad.offsetHeight === 0 || 
                          ad.style.display === 'none' || 
                          window.getComputedStyle(ad).display === 'none';
        
        if (isBlocked) {
          setAdBlockDetected(true);
        }
        
        document.body.removeChild(ad);
      }, 300);
    };

    detectAdBlock();
  }, []);

  return adBlockDetected;
}
