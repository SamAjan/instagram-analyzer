import React from 'react';
import HorizontalAd from './HorizontalAd';

export default function InlineContentAd({ className = '' }) {
  return (
    <div className={`w-full max-w-4xl mx-auto my-12 px-4 ${className}`}>
      <HorizontalAd />
    </div>
  );
}
