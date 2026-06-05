import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassCard = forwardRef(({ children, className = '', hover = false, animate = false, delay = 0, ...props }, ref) => {
  const baseClasses = `glass ${hover ? 'glass-hover' : ''} ${className}`;

  if (animate) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
