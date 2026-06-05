import React from 'react';
import { motion } from 'framer-motion';
import InlineContentAd from '../ads/InlineContentAd';

export default function WhySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            Neden Analiz <span className="gradient-text">Gerekiyor?</span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed font-light text-balance mx-auto">
            <p>
              Bir videonun milyon izlenmesi her zaman başarılı olduğun anlamına gelmez. Bazen yanlış kitleye yayılan viral içerikler hesabın uzun vadeli performansını düşürebilir.
            </p>
            <p>
              Bu sistem; <span className="text-white font-medium">içeriklerinin gerçekten takipçi getirip getirmediğini</span>, algoritmanın seni nasıl gördüğünü ve hesabının hangi noktada güç kaybettiğini analiz eder.
            </p>
          </div>
        </motion.div>
      </div>

      <InlineContentAd className="mt-16" />
    </section>
  );
}
