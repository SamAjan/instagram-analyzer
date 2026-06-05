import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

export default function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const animation = animate(count, end, {
        duration: duration / 1000,
        ease: "easeOut",
      });
      setHasAnimated(true);
      return animation.stop;
    }
  }, [end, duration, isInView, hasAnimated, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
