/**
 * Insight Generator Service
 *
 * Produces dynamic, prioritized insights based on Instagram metrics.
 * All text is in TURKISH with a professional social-media-strategist tone.
 *
 * Each insight follows the shape:
 *   { id, type, icon, title, description, priority }
 *
 * type  ∈ { 'positive', 'warning', 'critical', 'info' }
 * priority ∈ 1 (lowest) … 10 (highest)
 *
 * The generator evaluates 30+ rule-based conditions and returns the
 * top 8-12 most relevant insights sorted by priority (descending).
 */

const { generateId, calculatePercentage } = require('../utils/helpers');

/**
 * Generate insights for the given input data.
 * @param {object} data — validated input metrics
 * @returns {Array<object>} sorted insights (highest priority first)
 */
function generateInsights(data) {
  const {
    username,
    niche,
    followerGrowth,
    totalViews,
    topVideoViews,
    avgReelsViews,
    bestFollowerVideo,
    last14DaysChange,
    engagementRate,
    weeklyContent,
    saveRate,
    shareRate,
  } = data;

  const conversionRate = calculatePercentage(followerGrowth, totalViews);
  const viralRatio = avgReelsViews > 0 ? topVideoViews / avgReelsViews : 1;
  const alignmentRatio = topVideoViews > 0 ? bestFollowerVideo / topVideoViews : 0;

  const insights = [];

  // ─── 1. Niş Dışı Viral İçerik Uyarısı ──────────────────────────────
  if (topVideoViews > avgReelsViews * 5 && followerGrowth < totalViews * 0.005) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '⚠️',
      title: 'Niş Dışı Viral İçerik Uyarısı',
      description:
        'Tutan içeriğiniz niş dışı olabilir. Algoritma hesabınızı yanlış kitleye taşımış olabilir. Bu durum kısa vadede izlenme getirirken uzun vadede hesap performansını düşürebilir.',
      priority: 9,
    });
  }

  // ─── 2. Değerli İçerik, Düşük Keşfet Performansı ───────────────────
  if (saveRate > 3 && last14DaysChange < 0) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🔍',
      title: 'Değerli İçerik, Düşük Keşfet Performansı',
      description:
        'İçerikleriniz değerli bulunuyor ancak ilk izlenim gücü düşük olabilir. Hook (giriş) stratejinizi güçlendirmeniz önerilir.',
      priority: 8,
    });
  }

  // ─── 3. Güçlü Viral Yayılım Potansiyeli ────────────────────────────
  if (shareRate > 2) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🚀',
      title: 'Güçlü Viral Yayılım Potansiyeli',
      description:
        'İçerikleriniz viral yayılım potansiyeli taşıyor. Paylaşım oranınız ortalamanın üzerinde — bu, algoritmanın içeriklerinizi daha geniş kitlelere taşıması için güçlü bir sinyal.',
      priority: 7,
    });
  }

  // ─── 4. Düşük İçerik Üretim Frekansı ───────────────────────────────
  if (weeklyContent < 3) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '📉',
      title: 'Düşük İçerik Üretim Frekansı',
      description:
        'Algoritma hesabınızı aktif üretici olarak görmüyor olabilir. Haftada minimum 4-5 içerik paylaşmanız önerilir.',
      priority: 9,
    });
  }

  // ─── 5. Algoritma Performans Düşüşü ────────────────────────────────
  if (last14DaysChange < -15) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '🔻',
      title: 'Algoritma Performans Düşüşü',
      description:
        'Son dönemde içerik yapınız algoritma beklentileriyle uyuşmuyor olabilir. Format, zamanlama veya konu değişikliği düşünülmeli.',
      priority: 10,
    });
  }

  // ─── 6. Düşük Takipçi Dönüşüm Oranı ───────────────────────────────
  if (conversionRate < 0.3) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '👥',
      title: 'Düşük Takipçi Dönüşüm Oranı',
      description:
        'İzlenme alıyor olsanız bile içerikleriniz takipçiye dönüşmüyor. CTA (takip çağrısı) stratejinizi ve profil optimizasyonunuzu gözden geçirin.',
      priority: 8,
    });
  }

  // ─── 7. Güçlü Topluluk Bağlılığı ───────────────────────────────────
  if (engagementRate > 5) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '💪',
      title: 'Güçlü Topluluk Bağlılığı',
      description:
        'Etkileşim oranınız sektör ortalamasının çok üzerinde. Topluluğunuz içeriklerinize aktif olarak katılım gösteriyor.',
      priority: 6,
    });
  }

  // ─── 8. Ghost Follower Uyarısı ──────────────────────────────────────
  if (engagementRate < 1) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '👻',
      title: 'Ghost Follower Uyarısı',
      description:
        'Etkileşim oranınız oldukça düşük. Hesabınızda aktif olmayan (ghost) takipçi oranı yüksek olabilir. Bu durum algoritma performansınızı olumsuz etkiler.',
      priority: 9,
    });
  }

  // ─── 9. Aşırı Viral Sapma ──────────────────────────────────────────
  if (viralRatio > 10) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '📊',
      title: 'Aşırı Viral Sapma',
      description:
        'En çok izlenen videonuz ortalamanızın 10 katından fazla. Bu tür büyük sapmalar genellikle hesabın hedef kitlesini karıştırır.',
      priority: 8,
    });
  }

  // ─── 10. Yüksek Üretim Frekansı ────────────────────────────────────
  if (weeklyContent >= 7) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🔥',
      title: 'Yüksek Üretim Frekansı',
      description:
        'İçerik üretim hızınız çok iyi. Algoritma sizi aktif üretici olarak değerlendiriyor.',
      priority: 5,
    });
  }

  // ─── 11. Yüksek Kaydetme Performansı ───────────────────────────────
  if (saveRate > 5) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🔖',
      title: 'Yüksek Kaydetme Performansı',
      description:
        'Kaydetme oranınız çok yüksek. İçerikleriniz uzun vadeli değer taşıyor ve kullanıcılar tekrar dönmek istiyor.',
      priority: 6,
    });
  }

  // ─── 12. Düşük İçerik Değeri Sinyali ───────────────────────────────
  if (saveRate < 1) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '📋',
      title: 'Düşük İçerik Değeri Sinyali',
      description:
        'Kaydetme oranınız düşük. İçerikleriniz anlık tüketiliyor ama uzun vadeli değer sunmuyor olabilir. Eğitici veya referans içerikler eklemeyi düşünün.',
      priority: 7,
    });
  }

  // ─── 13. Güçlü Büyüme Trendi ───────────────────────────────────────
  if (last14DaysChange > 30) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '📈',
      title: 'Güçlü Büyüme Trendi',
      description:
        'Son 14 günde güçlü bir yükseliş trendi var. Algoritma içeriklerinizi aktif olarak destekliyor. Bu ivmeyi korumak için tutarlı paylaşım yapın.',
      priority: 7,
    });
  }

  // ─── 14. İçerik-Takipçi Uyumu Güçlü ────────────────────────────────
  if (alignmentRatio > 0.7) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🎯',
      title: 'İçerik-Takipçi Uyumu Güçlü',
      description:
        'En çok takipçi getiren videonuz aynı zamanda en çok izlenen videolarınızdan biri. Bu, içerik stratejinizin doğru kitleye ulaştığını gösterir.',
      priority: 6,
    });
  }

  // ─── 15. İçerik-Takipçi Uyumsuzluğu ────────────────────────────────
  if (alignmentRatio < 0.2 && topVideoViews > 0) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🔀',
      title: 'İçerik-Takipçi Uyumsuzluğu',
      description:
        'En çok izlenen videonuz ile en çok takipçi getiren videonuz çok farklı. Viral olan içerikler takipçiye dönüşmüyor olabilir.',
      priority: 7,
    });
  }

  // ─── 16. Etkileşim-Frekans Dengesi ─────────────────────────────────
  if (engagementRate > 3 && weeklyContent >= 5) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '⚡',
      title: 'Etkileşim-Frekans Dengesi Mükemmel',
      description:
        'Hem yüksek etkileşim oranı hem de tutarlı içerik üretimi sağlıyorsunuz. Bu kombinasyon algoritmanın hesabınızı öne çıkarması için ideal koşulları oluşturuyor.',
      priority: 6,
    });
  }

  // ─── 17. Fazla İçerik, Düşük Etkileşim ─────────────────────────────
  if (weeklyContent >= 7 && engagementRate < 2) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '⏳',
      title: 'Aşırı Üretim, Düşük Etkileşim',
      description:
        'Çok fazla içerik üretiyorsunuz ama etkileşim oranınız düşük. Kalite-kantite dengesini gözden geçirin; daha az ama daha kaliteli içerik paylaşmayı deneyin.',
      priority: 7,
    });
  }

  // ─── 18. Paylaşım-Kaydetme Uyumu ───────────────────────────────────
  if (shareRate > 2 && saveRate > 3) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🌟',
      title: 'Mükemmel İçerik Değer Dengesi',
      description:
        'Hem paylaşım hem kaydetme oranlarınız yüksek. İçerikleriniz hem viral yayılım hem uzun vadeli referans değeri taşıyor — bu nadir ve çok değerli bir kombinasyon.',
      priority: 7,
    });
  }

  // ─── 19. Düşük Paylaşım Potansiyeli ────────────────────────────────
  if (shareRate < 0.5 && saveRate < 1) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '🚫',
      title: 'Düşük Etkileşim Sinyalleri',
      description:
        'Hem paylaşım hem kaydetme oranlarınız düşük. İçerikleriniz kullanıcılarda yeterli etki bırakmıyor olabilir. İçerik formatınızı ve değer önerinizi yeniden değerlendirin.',
      priority: 9,
    });
  }

  // ─── 20. Hızlı Takipçi Büyümesi ────────────────────────────────────
  if (followerGrowth > 3000) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🏆',
      title: 'Güçlü Takipçi Kazanımı',
      description:
        `Son 30 günde ${followerGrowth.toLocaleString('tr-TR')} yeni takipçi kazanmışsınız. Bu büyüme hızı, hesabınızın keşfet sayfasında aktif olarak gösterildiğini işaret ediyor.`,
      priority: 6,
    });
  }

  // ─── 21. Niş-Spesifik İçerik Önerisi ───────────────────────────────
  if (niche && engagementRate > 2) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '💡',
      title: 'Niş Odaklı Strateji Avantajı',
      description:
        `"${niche}" alanında etkileşim oranınız iyi seviyede. Nişinize özel trend konuları takip ederek ve sektörel içerikler üreterek bu avantajı büyütebilirsiniz.`,
      priority: 4,
    });
  }

  // ─── 22. İçerik Formatı Çeşitlendirme ──────────────────────────────
  if (viralRatio < 2 && weeklyContent >= 4) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🎬',
      title: 'İçerik Formatı Çeşitlendirme Önerisi',
      description:
        'İçerikleriniz tutarlı performans gösteriyor ancak viral çıkış potansiyeliniz düşük. Farklı formatlar (duet, trend ses, behind-the-scenes) deneyerek algoritma çeşitliliğinizi artırın.',
      priority: 5,
    });
  }

  // ─── 23. Paylaşım Zamanlaması ──────────────────────────────────────
  if (last14DaysChange < 0 && weeklyContent >= 4) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🕐',
      title: 'Paylaşım Zamanlaması Optimizasyonu',
      description:
        'İçerik üretim frekansınız yeterli ancak performans düşüşü yaşıyorsunuz. Paylaşım saatlerinizi Instagram Insights\'tan kontrol edin — kitlenizin en aktif olduğu saatlerde paylaşım yapın.',
      priority: 6,
    });
  }

  // ─── 24. Profil Optimizasyonu ───────────────────────────────────────
  if (conversionRate < 0.5 && totalViews > 10000) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '👤',
      title: 'Profil Optimizasyonu Gerekli',
      description:
        'Yeterli görüntülenme alıyorsunuz ancak takipçiye dönüşüm düşük. Bio yazınızı, profil fotoğrafınızı ve öne çıkan hikayelerinizi optimize ederek dönüşüm oranını artırabilirsiniz.',
      priority: 7,
    });
  }

  // ─── 25. Hashtag Stratejisi ─────────────────────────────────────────
  if (last14DaysChange < 5 && engagementRate > 2) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '#️⃣',
      title: 'Hashtag Stratejisi Değerlendirmesi',
      description:
        'Etkileşim oranınız iyi ama keşfet performansı sınırlı. Hashtag stratejinizi gözden geçirin — niş-spesifik, orta hacimli hashtagler kullanarak erişiminizi artırabilirsiniz.',
      priority: 5,
    });
  }

  // ─── 26. İşbirliği Potansiyeli ─────────────────────────────────────
  if (engagementRate > 3 && followerGrowth > 500) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🤝',
      title: 'İşbirliği Potansiyeli Yüksek',
      description:
        'Etkileşim oranınız ve büyüme hızınız, diğer içerik üreticileri ile işbirliği yapmanız için ideal koşulları sağlıyor. Nişinizdeki hesaplarla ortak içerikler planlayın.',
      priority: 4,
    });
  }

  // ─── 27. İçerik Sütunu Analizi ─────────────────────────────────────
  if (viralRatio > 5 && alignmentRatio > 0.5) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🏛️',
      title: 'Güçlü İçerik Sütunu Yapısı',
      description:
        'Viral potansiyeliniz yüksek ve bu viral içerikler doğru kitleye ulaşıyor. İçerik sütunlarınız (content pillars) doğru kurgulanmış — bu yapıyı koruyun.',
      priority: 5,
    });
  }

  // ─── 28. Kitle Tutma Sinyali ───────────────────────────────────────
  if (saveRate > 3 && engagementRate > 3) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🔗',
      title: 'Güçlü Kitle Tutma Sinyalleri',
      description:
        'Hem kaydetme hem etkileşim oranlarınız yüksek. Bu, takipçilerinizin içeriklerinize bağlı olduğunu ve geri dönmek istediğini gösteriyor.',
      priority: 5,
    });
  }

  // ─── 29. Monetizasyon Hazırlığı ────────────────────────────────────
  if (engagementRate > 3 && followerGrowth > 2000 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '💰',
      title: 'Monetizasyon İçin Hazır',
      description:
        'Etkileşim, büyüme ve kaydetme metrikleriniz, hesabınızın monetizasyona hazır olduğunu gösteriyor. Marka işbirlikleri, sponsorluklar veya dijital ürün satışı düşünebilirsiniz.',
      priority: 4,
    });
  }

  // ─── 30. Marka İşbirliği Potansiyeli ──────────────────────────────
  if (engagementRate > 4 && weeklyContent >= 4 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🏷️',
      title: 'Yüksek Marka İşbirliği Potansiyeli',
      description:
        'Tutarlı içerik üretimi, yüksek etkileşim ve kaydetme oranlarınız sizi markalar için cazip bir işbirliği ortağı yapıyor. Medya kitinizi hazırlayın.',
      priority: 4,
    });
  }

  // ─── 31. Algoritma Favori Sinyalleri ───────────────────────────────
  if (last14DaysChange > 20 && shareRate > 1.5 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '✨',
      title: 'Algoritma Tarafından Destekleniyorsunuz',
      description:
        'Görüntülenme artışı, paylaşım ve kaydetme oranlarınız, Instagram algoritmasının içeriklerinizi aktif olarak öne çıkardığını gösteriyor. Bu momentum kritik — tutarlılığı koruyun.',
      priority: 7,
    });
  }

  // ─── 32. Topluluk Büyütme Stratejisi ──────────────────────────────
  if (engagementRate > 2 && followerGrowth < 500 && weeklyContent >= 3) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🌱',
      title: 'Topluluk Büyütme Fırsatı',
      description:
        'Etkileşim oranınız sağlıklı ama takipçi büyümeniz yavaş. Yorumlara aktif yanıt vererek, hikaye etkileşimlerini artırarak ve DM ile bağlantı kurarak organik topluluğunuzu büyütün.',
      priority: 5,
    });
  }

  // ─── 33. Orta Düzey Performans ────────────────────────────────────
  if (last14DaysChange > -5 && last14DaysChange < 10 && engagementRate > 1 && engagementRate < 3) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '📊',
      title: 'Stabil Performans — Büyüme Potansiyeli Mevcut',
      description:
        'Hesabınız stabil bir performans sergiliyor ancak büyüme ivmesi düşük. Mevcut stratejinize yeni formatlar veya trendler ekleyerek çıkış noktası oluşturabilirsiniz.',
      priority: 4,
    });
  }

  // ─── 34. Yüksek Görüntülenme Başarısı ────────────────────────────
  if (totalViews > 100000) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '👁️',
      title: 'Güçlü Erişim Performansı',
      description:
        `Son 30 günde ${totalViews.toLocaleString('tr-TR')} görüntülenme elde etmişsiniz. Bu, içeriklerinizin geniş bir kitleye ulaştığını gösteriyor.`,
      priority: 5,
    });
  }

  // ─── 35. Düşük Görüntülenme Uyarısı ──────────────────────────────
  if (totalViews < 5000 && weeklyContent >= 3) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🔇',
      title: 'Düşük Erişim Uyarısı',
      description:
        'İçerik üretiyorsunuz ama görüntülenme sayılarınız düşük. Keşfet algoritmasının sizi fark etmesi için hook stratejinizi güçlendirin ve trend sesleri kullanın.',
      priority: 8,
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // Sort by priority (descending) and return top 8-12 insights
  // ─────────────────────────────────────────────────────────────────────
  insights.sort((a, b) => b.priority - a.priority);

  // Return between 8 and 12 insights (or fewer if not enough conditions matched)
  const minInsights = 8;
  const maxInsights = 12;

  // If we have fewer than min, pad with a fallback general insight
  if (insights.length < minInsights) {
    const fallbackInsights = [
      {
        id: generateId(),
        type: 'info',
        icon: '📌',
        title: 'Düzenli Analiz Yapın',
        description:
          'Hesabınızın performansını düzenli olarak analiz etmek, stratejik kararlar almanıza yardımcı olur. Haftalık kontrol alışkanlığı edinin.',
        priority: 2,
      },
      {
        id: generateId(),
        type: 'info',
        icon: '🎯',
        title: 'Hedef Kitle Analizi',
        description:
          'Instagram Insights\'tan takipçilerinizin demografik verilerini inceleyin. İçeriklerinizi hedef kitlenizin ilgi alanlarına göre şekillendirin.',
        priority: 2,
      },
      {
        id: generateId(),
        type: 'info',
        icon: '🔄',
        title: 'Tutarlılık Anahtardır',
        description:
          'Algoritma, tutarlı içerik üreticilerini ödüllendirir. Belirli günlerde, belirli saatlerde paylaşım yaparak algoritmada güven oluşturun.',
        priority: 2,
      },
      {
        id: generateId(),
        type: 'info',
        icon: '📱',
        title: 'Hikaye Etkileşimlerini Artırın',
        description:
          'Anketler, soru kutuları ve quiz gibi etkileşimli hikaye formatlarını kullanarak topluluğunuzla bağınızı güçlendirin.',
        priority: 1,
      },
    ];

    while (insights.length < minInsights && fallbackInsights.length > 0) {
      insights.push(fallbackInsights.shift());
    }
  }

  return insights.slice(0, maxInsights);
}

module.exports = { generateInsights };
