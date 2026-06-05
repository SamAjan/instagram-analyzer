import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StickyMobileAd from './components/ads/StickyMobileAd';

const HomePage = lazy(() => import('./pages/HomePage'));
const AnalysisPage = lazy(() => import('./pages/AnalysisPage'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze" element={<AnalysisPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      <StickyMobileAd />
    </div>
  );
}

export default App;
