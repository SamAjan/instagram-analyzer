import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info, HelpCircle } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

const helpTexts = {
  followerCount: 'Profilinizde yazan toplam takipçi sayınız.',
  followerGrowth: 'Son 30 günde kazandığınız net takipçi sayısı. Instagram → Profesyonel Kontrol Paneli → Takipçi istatistiklerinden görebilirsiniz.',
  totalViews: 'Son 30 günde tüm içeriklerinizin toplam izlenme sayısı. Instagram → Profesyonel Kontrol Paneli → Erişilen Hesaplar → İzlenme kısmından görebilirsiniz.',
  topVideoViews: 'Son 30 gündeki en çok izlenen videonuzun izlenme sayısı. Herhangi bir videonuzun altındaki "Analizleri görüntüle" butonuna basarak görebilirsiniz.',
  avgReelsViews: 'Reels videolarınızın ortalama izlenme sayısı. Son 10 videonuzun izlenmelerini toplayıp 10\'a bölün.',
  weeklyContent: 'Haftada ortalama kaç içerik (Reels, gönderi, carousel) paylaşıyorsunuz?',
  avgLikes: 'Son 10 içeriğinizdeki ortalama beğeni sayısı. Her videonun altında görünen beğeni sayılarını toplayıp 10\'a bölün.',
  avgComments: 'Son 10 içeriğinizdeki ortalama yorum sayısı. Her videonun altında görünen yorum sayılarını toplayıp 10\'a bölün.',
  avgShares: 'Son 10 içeriğinizdeki ortalama paylaşım sayısı. Videonuzun "Analizleri görüntüle" kısmından "Paylaşımlar" rakamını görebilirsiniz.',
  avgSaves: 'Son 10 içeriğinizdeki ortalama kaydetme sayısı. Videonuzun "Analizleri görüntüle" kısmından "Kaydetmeler" rakamını görebilirsiniz.',
};

function HelpTooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <HelpCircle
        size={14}
        className="text-slate-500 hover:text-neon-purple cursor-help transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(prev => !prev)}
      />
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-xl bg-[#1a1a2e] border border-white/10 text-xs text-slate-300 shadow-xl shadow-black/40 leading-relaxed"
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a2e] border-r border-b border-white/10 rotate-45 -mt-1"></div>
        </motion.div>
      )}
    </span>
  );
}

export default function AnalysisForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    niche: '',
    followerCount: '',
    followerGrowth: '',
    totalViews: '',
    topVideoViews: '',
    avgReelsViews: '',
    weeklyContent: '',
    avgLikes: '',
    avgComments: '',
    avgShares: '',
    avgSaves: '',
  });

  const [errors, setErrors] = useState({});

  const niches = [
    'Seçiniz...', 'Fitness', 'Teknoloji', 'Moda', 'Yemek', 'Eğitim',
    'Eğlence', 'İş/Finans', 'Seyahat', 'Oyun', 'Sanat', 'Müzik',
    'Gayrimenkul', 'Sağlık', 'Kişisel Gelişim', 'E-Ticaret', 'Diğer'
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

    const numFields = ['followerCount', 'followerGrowth', 'totalViews', 'topVideoViews', 'avgReelsViews', 'weeklyContent', 'avgLikes', 'avgComments', 'avgShares', 'avgSaves'];
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

  const renderField = (label, name, placeholder, type = 'number', step) => (
    <div>
      <label className={labelClasses}>
        {label}
        {helpTexts[name] && <HelpTooltip text={helpTexts[name]} />}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        step={step}
        className={inputClasses}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-12"
      onSubmit={handleSubmit}
    >
      {/* Section 1: Hesap Bilgileri */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">
          1. Hesap Bilgileri
        </h3>
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
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">
          2. Takipçi & Görüntülenme Verileri
        </h3>
        <p className="text-sm text-slate-500 -mt-2">
          Bu verileri Instagram uygulamanızdaki <span className="text-neon-purple">Profesyonel Kontrol Paneli</span>'nden bulabilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderField('Toplam Takipçi Sayısı', 'followerCount', 'Örn: 25000')}
          {renderField('Son 30 Gün Takipçi Artışı', 'followerGrowth', 'Örn: 1500')}
          {renderField('Son 30 Gün Toplam İzlenme', 'totalViews', 'Örn: 250000')}
          {renderField('En Çok İzlenen Video', 'topVideoViews', 'Örn: 100000')}
          {renderField('Ortalama Reels İzlenmesi', 'avgReelsViews', 'Örn: 15000')}
          {renderField('Haftalık İçerik Sayısı', 'weeklyContent', 'Örn: 5')}
        </div>
      </div>

      {/* Section 3: Etkileşim Verileri */}
      <div className="space-y-6">
        <h3 className="text-xl font-display font-bold text-white border-b border-white/10 pb-4">
          3. Etkileşim Verileri
        </h3>
        <p className="text-sm text-slate-500 -mt-2">
          Son 10 içeriğinizin ortalamasını yazın. Her videonuzun <span className="text-neon-purple">"Analizleri görüntüle"</span> kısmından bu verilere ulaşabilirsiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Ortalama Beğeni Sayısı', 'avgLikes', 'Örn: 850')}
          {renderField('Ortalama Yorum Sayısı', 'avgComments', 'Örn: 45')}
          {renderField('Ortalama Paylaşım Sayısı', 'avgShares', 'Örn: 120')}
          {renderField('Ortalama Kaydetme Sayısı', 'avgSaves', 'Örn: 200')}
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
