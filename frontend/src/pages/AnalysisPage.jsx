import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import AnalysisForm from '../components/analysis/AnalysisForm';
import LoadingScreen from '../components/analysis/LoadingScreen';
import ResultsDashboard from '../components/analysis/ResultsDashboard';
import { analyzeAccount } from '../utils/api';
import NeonButton from '../components/ui/NeonButton';

export default function AnalysisPage() {
  // 'form' | 'loading' | 'results' | 'error'
  const [status, setStatus] = useState('form');
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async (formData) => {
    setStatus('loading');
    
    try {
      // API call
      const response = await analyzeAccount(formData);
      
      // Artificial delay to let the loading animation run for at least a bit
      setTimeout(() => {
        setResults(response.data);
        setStatus('results');
        window.scrollTo(0, 0);
      }, 2000);
      
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header (only show when not loading/results) */}
        <AnimatePresence>
          {(status === 'form' || status === 'error') && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Hesabını <span className="text-neon-purple">Analiz Et</span>
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Son 30 günlük verilerini girerek algoritmanın seni nasıl gördüğünü keşfet. Bu bilgiler tamamen güvenlidir ve hiçbir yere kaydedilmez.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {status === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AnalysisForm onSubmit={handleAnalyze} />
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}

          {status === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsDashboard results={results} />
              
              <div className="mt-12 flex justify-center">
                <NeonButton variant="outline" onClick={() => setStatus('form')}>
                  Yeni Bir Hesap Analiz Et
                </NeonButton>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto mt-20 p-8 bg-[#111118] border border-red-500/20 rounded-3xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bir Hata Oluştu</h3>
              <p className="text-slate-400 mb-8">{errorMessage}</p>
              <NeonButton 
                fullWidth 
                onClick={() => setStatus('form')}
              >
                Tekrar Dene
              </NeonButton>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
