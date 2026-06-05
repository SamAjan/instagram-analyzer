import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref, options = { threshold: 0.1, rootMargin: '0px' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Genellikle bir kere görününce yüklemeye devam etmek isteriz
        // Ekrana girince true olur, çıkınca false yapmıyoruz reklamlar için
      }
    }, options);

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options.threshold, options.rootMargin]);

  return isIntersecting;
}
