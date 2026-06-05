import React from 'react';
import Hero from '../components/home/Hero';
import WhySection from '../components/home/WhySection';
import FeatureCards from '../components/home/FeatureCards';
import NeonButton from '../components/ui/NeonButton';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Hero />
      <WhySection />
      <FeatureCards />
      
      {/* Bottom CTA */}
      <section className="py-32 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-neon-purple/5 mix-blend-screen pointer-events-none"></div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
          Gerçekleri Öğrenmeye <span className="text-neon-purple">Hazır mısın?</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Sadece 2 dakikanı ayırarak hesabının algoritma gözündeki değerini öğren. Şifre gerekmez, tamamen güvenli.
        </p>
        <div className="flex justify-center">
          <NeonButton size="lg" icon={ArrowRight} onClick={() => navigate('/analyze')}>
            Hemen Analize Başla
          </NeonButton>
        </div>
      </section>
    </div>
  );
}
