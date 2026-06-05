/**
 * Recommendation Engine Service
 *
 * Generates strategic, actionable recommendations based on the weakest
 * performance areas. These recommendations are meant for the "premium"
 * section of the frontend.
 *
 * Returns 5-8 recommendations in TURKISH with a professional social-media
 * strategist tone. Each recommendation includes actionable items.
 */

const { generateId } = require('../utils/helpers');

/**
 * Generate targeted recommendations based on scores and input data.
 * @param {object} scores — the calculated score objects
 * @param {object} data   — the raw validated input data
 * @returns {Array<object>} 5-8 recommendations sorted by priority
 */
function generateRecommendations(scores, data) {
  const {
    contentScore,
    algorithmScore,
    followerConversionScore,
    viralPotentialScore,
  } = scores;

  const {
    weeklyContent,
    saveRate,
    shareRate,
    engagementRate,
    followerGrowthRate,
    followerGrowth,
    totalViews,
    niche,
  } = data;

  const recommendations = [];

  // ─── Content Strategy (weak contentScore) ───────────────────────────
  if (contentScore.score < 60) {
    recommendations.push({
      id: generateId(),
      title: 'İçerik Stratejisi Revizyonu',
      description:
        'İçerik kaliteniz ve üretim frekansınız geliştirilmeli. Tutarlı, değerli ve niş odaklı içerikler üretmek algoritma performansınızı doğrudan etkiler.',
      actionItems: [
        'Haftada minimum 5 içerik paylaşım takvimi oluşturun',
        'Her içerikte net bir değer önerisi sunun (eğitim, ilham, eğlence)',
        'İçerik sütunları (content pillars) belirleyin: 3-4 ana konu etrafında dönün',
        'Carousel, Reels ve tek görsel formatlarını dengeli kullanın',
        'Her içerikte güçlü bir CTA (call-to-action) ekleyin',
      ],
      priority: 9,
    });
  }

  if (contentScore.score < 40) {
    recommendations.push({
      id: generateId(),
      title: 'Acil İçerik Üretim Planı',
      description:
        'İçerik üretim frekansınız kritik seviyede düşük. Algoritma sizi pasif hesap olarak değerlendirmeye başlayabilir.',
      actionItems: [
        'Bugünden itibaren günde en az 1 Reels paylaşın',
        'Batch (toplu) içerik üretimi yaparak 1 haftayı önceden planlayın',
        'Trend sesleri ve formatları takip ederek hızlı içerik üretin',
        'Repost/reshare stratejileri ile içerik çeşitliliğini artırın',
      ],
      priority: 10,
    });
  }

  // ─── Algorithm Optimization (weak algorithmScore) ───────────────────
  if (algorithmScore.score < 60) {
    recommendations.push({
      id: generateId(),
      title: 'Algoritma Optimizasyonu',
      description:
        'Keşfet performansınız düşük. Algoritmanın içeriklerinizi öne çıkarması için teknik ve stratejik düzenlemeler yapılmalı.',
      actionItems: [
        'İlk 3 saniye kuralını uygulayın — güçlü hook ile başlayın',
        'Video uzunluğunu 15-30 saniye arasında tutun (kısa Reels formatı)',
        'Paylaşım saatlerini Instagram Insights verilerine göre optimize edin',
        'Trend hashtagleri niş-spesifik hashtaglerle kombine edin (3+3+3 formülü)',
        'İlk 30 dakikada gelen etkileşimleri artırmak için hikaye ile destekleyin',
      ],
      priority: 9,
    });
  }

  if (followerGrowthRate < 0) {
    recommendations.push({
      id: generateId(),
      title: 'Performans Düşüşü Kurtarma Planı',
      description:
        'Son 14 günde ciddi bir performans düşüşü tespit edildi. Acil müdahale ile algoritmadaki konumunuzu geri kazanabilirsiniz.',
      actionItems: [
        'Son tutan içeriklerinizi analiz edin ve benzer formatta yeni içerikler üretin',
        'Konu veya format değişikliğinden kaçının — tutarlılığı koruyun',
        'Günde 2 Reels paylaşarak algoritma sinyallerinizi güçlendirin',
        'Hikaye etkileşimlerini artırarak hesap aktivitesini yükseltin',
        'Takipçilerinizle DM ve yorum üzerinden aktif iletişim kurun',
      ],
      priority: 10,
    });
  }

  // ─── Profile & CTA Optimization (weak conversionScore) ─────────────
  if (followerConversionScore.score < 60) {
    recommendations.push({
      id: generateId(),
      title: 'Profil ve CTA Optimizasyonu',
      description:
        'Görüntülenme alıyorsunuz ama takipçiye dönüştüremiyorsunuz. Profil sayfanız ve içerik içi yönlendirmeleriniz güçlendirilmeli.',
      actionItems: [
        'Bio\'nuzu yeniden yazın: kim olduğunuz + ne değer sunduğunuz + CTA',
        'Profil fotoğrafınızı profesyonel ve tanınabilir yapın',
        'Öne çıkan hikayeleri kategorilere ayırın (portföy, SSS, hakkında)',
        'Her videoda doğal bir "takip et" çağrısı ekleyin',
        'Sabitlenmiş gönderileri en iyi performans gösteren içeriklerle güncelleyin',
      ],
      priority: 8,
    });
  }

  if (followerConversionScore.score < 35) {
    recommendations.push({
      id: generateId(),
      title: 'Takipçi Dönüşüm Acil Eylem Planı',
      description:
        'Takipçi dönüşüm oranınız kritik seviyede düşük. İçerikleriniz doğru kitleye ulaşmıyor veya profil sayfanız yeterince ikna edici değil.',
      actionItems: [
        'Hedef kitlenizi yeniden tanımlayın ve içerikleri buna göre şekillendirin',
        'Her videoda "Daha fazlası için takip et" benzeri bir CTA ekleyin',
        'Profil sayfanızı bir "landing page" gibi düşünüp optimize edin',
        'Niş dışı viral içerik üretimini minimize edin',
      ],
      priority: 9,
    });
  }

  // ─── Content Format / Hook (weak viralScore) ───────────────────────
  if (viralPotentialScore.score < 60) {
    recommendations.push({
      id: generateId(),
      title: 'Viral İçerik Stratejisi',
      description:
        'İçeriklerinizin viral potansiyeli geliştirilmeli. Paylaşılabilir ve keşfedilebilir içerikler üretmek büyüme hızınızı katlayabilir.',
      actionItems: [
        'Hook (giriş) cümlelerinizi güçlendirin — merak uyandıran sorular kullanın',
        'Paylaşılabilir formatlar deneyin: karşılaştırma, liste, "bunu biliyor muydun?"',
        'Trend seslerini nişinize uyarlayarak kullanın',
        'Duygusal bağ kuran hikayeler anlatın — kişisel deneyim paylaşın',
        'Video sonlarında "bunu arkadaşınla paylaş" gibi paylaşım CTA\'ları ekleyin',
      ],
      priority: 7,
    });
  }

  // ─── Engagement Enhancement ─────────────────────────────────────────
  if (engagementRate < 2) {
    recommendations.push({
      id: generateId(),
      title: 'Etkileşim Artırma Stratejisi',
      description:
        'Etkileşim oranınız sektör ortalamasının altında. Topluluğunuzla daha güçlü bir bağ kurmanız gerekiyor.',
      actionItems: [
        'Her gönderide soru sorun — yorum yapmayı teşvik edin',
        'Gelen yorumlara ilk 1 saat içinde yanıt verin',
        'Hikaye anketleri, quiz ve soru kutuları kullanın',
        'Kullanıcı tarafından oluşturulan içerikleri (UGC) paylaşın',
        'Canlı yayın yaparak doğrudan etkileşim kurun',
        'Diğer hesapların içeriklerine anlamlı yorumlar yapın',
      ],
      priority: 8,
    });
  }

  // ─── Save Rate Improvement ──────────────────────────────────────────
  if (saveRate < 1.5) {
    recommendations.push({
      id: generateId(),
      title: 'Kaydetme Oranı İyileştirme',
      description:
        'Kaydetme oranınız düşük. Kullanıcıların tekrar dönmek isteyeceği, referans değeri taşıyan içerikler üretmelisiniz.',
      actionItems: [
        'Eğitici içerikler üretin: adım-adım rehberler, ipuçları, checklist\'ler',
        'Carousel (slayt) formatında bilgi yoğun içerikler paylaşın',
        'İçerik sonunda "kaydet ve daha sonra uygula" çağrısı ekleyin',
        `"${niche}" alanında referans kaynak olacak içerikler üretin`,
      ],
      priority: 7,
    });
  }

  // ─── Growth Acceleration ────────────────────────────────────────────
  if (followerGrowth < 500 && engagementRate > 2) {
    recommendations.push({
      id: generateId(),
      title: 'Büyüme Hızlandırma Stratejisi',
      description:
        'Etkileşim oranınız iyi ama büyüme hızınız yavaş. Erişiminizi artıracak stratejiler uygulamanız gerekiyor.',
      actionItems: [
        'Nişinizdeki diğer hesaplarla işbirliği içerikleri planlayın',
        'Instagram Reels\'e ağırlık verin — keşfet erişimi en yüksek format',
        'Cross-platform paylaşım yapın (TikTok, YouTube Shorts)',
        'Giveaway veya challenge kampanyaları düzenleyin',
        'Takipçilerinizden arkadaşlarını etiketlemelerini isteyin',
      ],
      priority: 6,
    });
  }

  // ─── Sort by priority and return 5-8 ────────────────────────────────
  recommendations.sort((a, b) => b.priority - a.priority);
  return recommendations.slice(0, 8);
}

module.exports = { generateRecommendations };
