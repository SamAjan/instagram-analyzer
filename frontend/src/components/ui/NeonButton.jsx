import React from 'react';
import { motion } from 'framer-motion';

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  href,
  type = 'button',
  className = ''
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-semibold'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-purple to-accent-cyan text-white border-none shadow-neon hover:shadow-neon-lg',
    secondary: 'bg-white/10 backdrop-blur-md text-neon-purple border border-white/10 hover:bg-white/20 hover:border-white/20',
    outline: 'bg-transparent text-neon-purple border-2 border-neon-purple hover:bg-neon-purple/10',
  };

  const baseClasses = `relative flex items-center justify-center gap-2 rounded-full transition-all duration-300 overflow-hidden font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className={size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
      ) : null}
      <span>{children}</span>
      {variant === 'primary' && !disabled && !loading && (
        <span className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      )}
    </>
  );

  const motionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
