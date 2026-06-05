import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

export default function AnalysisForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    niche: '',
    followerGrowth: '',
    totalViews: '',
    topVideoViews: '',
    avgReelsViews: '',
    bestFollowerVideo: '',
    last14DaysChange: '',
    engagementRate: '',
    weeklyContent: '',
    saveRate: '',
    shareRate: ''
  });

  const [errors, setErrors] = useState({});

  const niches = [
    'Seçiniz...', 'Fitness', 'Teknoloji', 'Moda', 'Yemek', 'Eğitim', 
    'Eğlence', 'İş/Finans', 'Seyahat', 'Oyun', 'Sanat', 'Müzik', 'Diğer'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Kullanıcı adı zorunludur.';
    if (!formData.niche || formData.niche === 'Seçiniz...') newErrors.niche = 'Lütfen bir niş seçiniz.';
    
    const numFields = ['followerGrowth', 'totalViews', 'topVideoViews', 'avgReelsViews', 'bestFollowerVideo', 'last14DaysChange', 'engagementRate', 'weeklyContent', 'saveRate', 'shareRate'];
    numFields.forEach(field => {
      if (formData[field] === '') newErrors[field] = 'Bu alan zorunludur.';
      else if (isNaN(Number(formData[field]))) newErrors[field] = 'Lütfen geçerli bir sayı giriniz.';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClasses = "w-full bg-[#111118] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all";
  const labelClasses = "block text-sm text-slate-400 mb-2 flex items-center gap-2";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-12"
      onSubmit={handleSubmit}
    >
      {/* Section 1: Hesap Bilgileri */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">1. Hesap Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Instagram Kullanıcı Adı</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="@kullaniciadi" className={inputClasses} />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className={labelClasses}>Niş / Konu Alanı</label>
            <select name="niche" value={formData.niche} onChange={handleChange} className={inputClasses}>
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            {errors.niche && <p className="text-red-500 text-xs mt-1">{errors.niche}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Takipçi & Görüntülenme */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">2. Takipçi & Görüntülenme (Son 30 Gün)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>Takipçi Artışı <Info size={14} className="text-slate-500"/></label>
            <input type="number" name="followerGrowth" value={formData.followerGrowth} onChange={handleChange} placeholder="Örn: 1500" className={inputClasses} />
            {errors.followerGrowth && <p className="text-red-500 text-xs mt-1">{errors.followerGrowth}</p>}
          </div>
          <div>
            <label className={labelClasses}>Toplam Görüntülenme</label>
            <input type="number" name="totalViews" value={formData.totalViews} onChange={handleChange} placeholder="Örn: 250000" className={inputClasses} />
            {errors.totalViews && <p className="text-red-500 text-xs mt-1">{errors.totalViews}</p>}
          </div>
          <div>
            <label className={labelClasses}>En Çok İzlenen Video</label>
            <input type="number" name="topVideoViews" value={formData.topVideoViews} onChange={handleChange} placeholder="Örn: 100000" className={inputClasses} />
            {errors.topVideoViews && <p className="text-red-500 text-xs mt-1">{errors.topVideoViews}</p>}
          </div>
          <div>
            <label className={labelClasses}>Ortalama Reels İzlenmesi</label>
            <input type="number" name="avgReelsViews" value={formData.avgReelsViews} onChange={handleChange} placeholder="Örn: 15000" className={inputClasses} />
            {errors.avgReelsViews && <p className="text-red-500 text-xs mt-1">{errors.avgReelsViews}</p>}
          </div>
          <div>
            <label className={labelClasses}>En Çok Takipçi Getiren Video</label>
            <input type="number" name="bestFollowerVideo" value={formData.bestFollowerVideo} onChange={handleChange} placeholder="Örn: 80000" className={inputClasses} />
            {errors.bestFollowerVideo && <p className="text-red-500 text-xs mt-1">{errors.bestFollowerVideo}</p>}
          </div>
        </div>
      </div>

      {/* Section 3: Performans Metrikleri */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">3. Performans Metrikleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClasses}>14 Günlük Büyüme Değişimi (%)</label>
            <input type="number" name="last14DaysChange" value={formData.last14DaysChange} onChange={handleChange} placeholder="Örn: -15 veya 20" className={inputClasses} />
            {errors.last14DaysChange && <p className="text-red-500 text-xs mt-1">{errors.last14DaysChange}</p>}
          </div>
          <div>
            <label className={labelClasses}>Etkileşim Oranı (%)</label>
            <input type="number" name="engagementRate" step="0.1" value={formData.engagementRate} onChange={handleChange} placeholder="Örn: 3.5" className={inputClasses} />
            {errors.engagementRate && <p className="text-red-500 text-xs mt-1">{errors.engagementRate}</p>}
          </div>
          <div>
            <label className={labelClasses}>Haftalık İçerik Sayısı</label>
            <input type="number" name="weeklyContent" value={formData.weeklyContent} onChange={handleChange} placeholder="Örn: 5" className={inputClasses} />
            {errors.weeklyContent && <p className="text-red-500 text-xs mt-1">{errors.weeklyContent}</p>}
          </div>
          <div>
            <label className={labelClasses}>Kaydetme Oranı (%)</label>
            <input type="number" name="saveRate" step="0.1" value={formData.saveRate} onChange={handleChange} placeholder="Örn: 2.1" className={inputClasses} />
            {errors.saveRate && <p className="text-red-500 text-xs mt-1">{errors.saveRate}</p>}
          </div>
          <div>
            <label className={labelClasses}>Paylaşım Oranı (%)</label>
            <input type="number" name="shareRate" step="0.1" value={formData.shareRate} onChange={handleChange} placeholder="Örn: 1.5" className={inputClasses} />
            {errors.shareRate && <p className="text-red-500 text-xs mt-1">{errors.shareRate}</p>}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <NeonButton type="submit" size="lg" icon={Sparkles} fullWidth>
          Analizi Başlat
        </NeonButton>
      </div>
    </motion.form>
  );
}
