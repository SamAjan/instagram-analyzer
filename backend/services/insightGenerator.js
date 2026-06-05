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
 * Generate insights for the given enriched input data.
 * @param {object} data — enriched input metrics (with calculated rates)
 * @returns {Array<object>} sorted insights (highest priority first)
 */
function generateInsights(data) {
  const {
    username,
    niche,
    followerCount,
    followerGrowth,
    totalViews,
    topVideoViews,
    avgReelsViews,
    weeklyContent,
    avgLikes,
    avgComments,
    avgShares,
    avgSaves,
    engagementRate,
    saveRate,
    shareRate,
    followerGrowthRate,
    viralRatio,
  } = data;

  const conversionRate = calculatePercentage(followerGrowth, totalViews);

  const insights = [];

  // ─── 1. Niş Dışı Viral İçerik Uyarısı ──────────────────────────────
  if (viralRatio > 5 && conversionRate < 0.5) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '⚠️',
      title: 'Niş Dışı Viral İçerik Uyarısı',
      description:
        'En çok izlenen videonuz ortalamanızın çok üstünde ama takipçiye dönüşmüyor. Bu, içeriğin niş dışında viral olduğuna işaret eder. Algoritma hesabınızı yanlış kitleye taşımış olabilir.',
      priority: 9,
    });
  }

  // ─── 2. Değerli İçerik, Düşük Keşfet ───────────────────────────────
  if (saveRate > 3 && followerGrowthRate < 2) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🔍',
      title: 'Değerli İçerik, Düşük Keşfet Performansı',
      description:
        'İçerikleriniz kaydediliyor yani değerli bulunuyor, ama büyüme yavaş. Hook (giriş kancası) stratejinizi güçlendirin — ilk 1 saniyede dikkat çekin. Güçlü bir hook, keşfet sayfasına girmenin anahtarıdır.',
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
        `İçerikleriniz ortalama ${avgShares} paylaşım alıyor. Bu, algoritmanın içeriklerinizi daha geniş kitlelere taşıması için güçlü bir sinyal. Paylaşılabilir formatları (bilgi grafikleri, "arkadaşını etiketle" içerikleri) artırın.`,
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
        `Haftada sadece ${weeklyContent} içerik paylaşıyorsunuz. Algoritma sizi aktif üretici olarak görmüyor olabilir. Haftada minimum 4-5 içerik paylaşmanız önerilir. Batch üretim (toplu çekim) yaparak bunu kolayca sağlayabilirsiniz.`,
      priority: 9,
    });
  }

  // ─── 5. Düşük Büyüme Uyarısı ──────────────────────────────────────
  if (followerGrowthRate < -1) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '🔻',
      title: 'Takipçi Kaybı Tespit Edildi',
      description:
        'Son 30 günde takipçi kaybediyorsunuz. Bu, içerik stratejinizin veya paylaşım sıklığınızın takipçi beklentileriyle uyuşmadığına işaret edebilir. İçerik formatınızı, konularınızı ve paylaşım zamanlamanızı gözden geçirin.',
      priority: 10,
    });
  }

  // ─── 6. Düşük Takipçi Dönüşüm Oranı ───────────────────────────────
  if (conversionRate < 0.3 && totalViews > 5000) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '👥',
      title: 'Düşük Takipçi Dönüşüm Oranı',
      description:
        'İzlenme alıyorsunuz ama takipçiye dönüşmüyor. Profil bio\'nuzu optimize edin, her videoda net bir CTA (takip çağrısı) kullanın. "Daha fazlası için takip et" gibi basit ama etkili çağrılar ekleyin.',
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
        `Etkileşim oranınız %${engagementRate} — sektör ortalaması olan %1-3'ün çok üzerinde. Topluluğunuz size bağlı ve içeriklerinize aktif katılım gösteriyor. Bu kitleyi korumak için yorumlara cevap verin ve hikaye etkileşimleri yapın.`,
      priority: 6,
    });
  }

  // ─── 8. Ghost Follower Uyarısı ──────────────────────────────────────
  if (engagementRate < 1 && followerCount > 1000) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '👻',
      title: 'Ghost Follower Uyarısı',
      description:
        `Etkileşim oranınız %${engagementRate} — bu çok düşük. ${followerCount.toLocaleString('tr-TR')} takipçiniz var ama çoğu aktif değil. Ghost takipçiler algoritma performansınızı düşürür. Hikaye anketleri ve soru kutuları ile aktif kitleyi belirleyin.`,
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
        `En çok izlenen videonuz (${topVideoViews.toLocaleString('tr-TR')}) ortalamanızın ${Math.round(viralRatio)} katı. Bu tür büyük sapmalar hesabın hedef kitlesini karıştırabilir. Tutan formatta ama nişinize uygun içerikler üretin.`,
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
        `Haftada ${weeklyContent} içerik paylaşıyorsunuz — harika! Algoritma sizi aktif üretici olarak değerlendiriyor. Bu tutarlılığı koruyun.`,
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
        `Kaydetme oranınız %${saveRate} — bu çok güçlü. İçerikleriniz uzun vadeli değer taşıyor. Eğitici, "nasıl yapılır" ve referans içeriklere devam edin.`,
      priority: 6,
    });
  }

  // ─── 12. Düşük İçerik Değeri Sinyali ───────────────────────────────
  if (saveRate < 1 && avgReelsViews > 1000) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '📋',
      title: 'Düşük İçerik Değeri Sinyali',
      description:
        'İçerikleriniz izleniyor ama kaydedilmiyor. Bu, içeriklerinizin anlık tüketilip unutulduğunu gösterir. Eğitici içerikler, listeler, "kaydet ve sonra uygula" formatları ekleyin.',
      priority: 7,
    });
  }

  // ─── 13. Güçlü Büyüme Trendi ───────────────────────────────────────
  if (followerGrowthRate > 10) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '📈',
      title: 'Güçlü Büyüme Trendi',
      description:
        `Son 30 günde %${followerGrowthRate} büyüme sağlamışsınız! Algoritma içeriklerinizi aktif olarak destekliyor. Bu ivmeyi korumak için tutarlı ve kaliteli paylaşım yapın.`,
      priority: 7,
    });
  }

  // ─── 14. Hook Stratejisi Gerekli ───────────────────────────────────
  if (avgReelsViews < followerCount * 0.1 && weeklyContent >= 3) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🎣',
      title: 'Hook (Giriş Kancası) Stratejisi Gerekli',
      description:
        'İzlenme sayılarınız takipçi sayınıza göre düşük. İlk 1-2 saniyedeki hook (kanca) yeterince güçlü olmayabilir. "Bunu bilmiyordun...", "3 saniyede öğren", "Kaydırma!" gibi dikkat çekici girişler deneyin.',
      priority: 8,
    });
  }

  // ─── 15. Yorum Etkileşimi Düşük ───────────────────────────────────
  if (avgComments < avgLikes * 0.02 && avgLikes > 100) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '💬',
      title: 'Yorum Oranı Düşük',
      description:
        'Beğeni alıyorsunuz ama yorum oranınız düşük. İçeriklerinizin sonuna "Sen ne düşünüyorsun?", "Yorumlarda söyle" gibi soru-cevap CTA\'ları ekleyerek yorum oranınızı artırabilirsiniz.',
      priority: 5,
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
        'Hem yüksek etkileşim hem tutarlı üretim var. Bu kombinasyon algoritmanın hesabınızı öne çıkarması için ideal koşulları oluşturuyor.',
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
        'Çok fazla içerik üretiyorsunuz ama etkileşim oranı düşük. Kalite > kantite! Daha az ama daha kaliteli içerik paylaşmayı deneyin. Her içeriği "bunu paylaşmama değer mi?" diye sorgulayın.',
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

  // ─── 19. Düşük Etkileşim Sinyalleri ────────────────────────────────
  if (shareRate < 0.5 && saveRate < 1 && engagementRate < 1.5) {
    insights.push({
      id: generateId(),
      type: 'critical',
      icon: '🚫',
      title: 'Düşük Etkileşim Sinyalleri',
      description:
        'Paylaşım, kaydetme ve etkileşim oranlarınızın hepsi düşük. İçerik formatınızı tamamen değiştirmeyi düşünün. Trend sesleri, popüler formatlar ve duygu tetikleyen başlıklar deneyin.',
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
        `Son 30 günde ${followerGrowth.toLocaleString('tr-TR')} yeni takipçi kazanmışsınız! Bu büyüme, keşfet sayfasında aktif olarak gösterildiğinizi işaret ediyor.`,
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
        'İçerikleriniz tutarlı performans gösteriyor ancak viral çıkış potansiyeliniz düşük. Farklı formatlar (duet, trend ses, behind-the-scenes, POV) deneyerek algoritma çeşitliliğinizi artırın.',
      priority: 5,
    });
  }

  // ─── 23. Beğeni-İzlenme Oranı Analizi ─────────────────────────────
  if (avgLikes > 0 && avgReelsViews > 0) {
    const likeToViewRate = (avgLikes / avgReelsViews) * 100;
    if (likeToViewRate > 10) {
      insights.push({
        id: generateId(),
        type: 'positive',
        icon: '❤️',
        title: 'Yüksek Beğeni-İzlenme Oranı',
        description:
          `İzleyenlerin %${likeToViewRate.toFixed(1)}'i beğeni bırakıyor. Bu, içeriklerinizin izleyicilerde güçlü bir etki bıraktığını gösteriyor. Harika iş!`,
        priority: 5,
      });
    } else if (likeToViewRate < 2) {
      insights.push({
        id: generateId(),
        type: 'warning',
        icon: '💔',
        title: 'Düşük Beğeni Oranı',
        description:
          'İzleyenlerin çok azı beğeni bırakıyor. İçeriklerinizin sonunda "beğenmeyi unutma" hatırlatması yapın veya daha duygusal/etkileyici içerikler üretin.',
        priority: 6,
      });
    }
  }

  // ─── 24. Profil Optimizasyonu ───────────────────────────────────────
  if (conversionRate < 0.5 && totalViews > 10000) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '👤',
      title: 'Profil Optimizasyonu Gerekli',
      description:
        'Yeterli izlenme alıyorsunuz ama takipçiye dönüşüm düşük. Bio yazınızı, profil fotoğrafınızı ve öne çıkan hikayelerinizi optimize edin. Bio\'nuzda "ne yapıyorsunuz + kime fayda sağlıyorsunuz" net olsun.',
      priority: 7,
    });
  }

  // ─── 25. İşbirliği Potansiyeli ─────────────────────────────────────
  if (engagementRate > 3 && followerGrowth > 500) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🤝',
      title: 'İşbirliği Potansiyeli Yüksek',
      description:
        'Etkileşim oranınız ve büyümeniz, diğer içerik üreticileri ile işbirliği için ideal. Nişinizdeki hesaplarla ortak Reels, canlı yayın veya takeover içerikler planlayın.',
      priority: 4,
    });
  }

  // ─── 26. Güçlü İçerik Sütunu ──────────────────────────────────────
  if (viralRatio > 5 && conversionRate > 1) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🏛️',
      title: 'Güçlü İçerik Sütunu Yapısı',
      description:
        'Viral potansiyeliniz yüksek ve viral içerikler aynı zamanda takipçiye dönüşüyor. İçerik sütunlarınız doğru kurgulanmış — bu yapıyı koruyun ve tekrarlayın.',
      priority: 5,
    });
  }

  // ─── 27. Kitle Tutma Sinyali ───────────────────────────────────────
  if (saveRate > 3 && engagementRate > 3) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🔗',
      title: 'Güçlü Kitle Tutma Sinyalleri',
      description:
        'Hem kaydetme hem etkileşim yüksek. Takipçileriniz içeriklerinize bağlı ve geri dönmek istiyor. Bu sadık kitleyi DM grupları veya yakın arkadaş listesiyle daha da yakınlaştırabilirsiniz.',
      priority: 5,
    });
  }

  // ─── 28. Monetizasyon Hazırlığı ────────────────────────────────────
  if (engagementRate > 3 && followerGrowth > 2000 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '💰',
      title: 'Monetizasyon İçin Hazır',
      description:
        'Etkileşim, büyüme ve kaydetme metrikleriniz monetizasyona hazır olduğunuzu gösteriyor. Marka işbirlikleri, sponsorluklar, dijital ürün satışı veya mentorluk programı düşünebilirsiniz.',
      priority: 4,
    });
  }

  // ─── 29. Marka İşbirliği Potansiyeli ──────────────────────────────
  if (engagementRate > 4 && weeklyContent >= 4 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '🏷️',
      title: 'Yüksek Marka İşbirliği Potansiyeli',
      description:
        'Tutarlı üretim, yüksek etkileşim ve kaydetme oranları sizi markalar için cazip yapıyor. Bir medya kiti hazırlayıp markalara ulaşın.',
      priority: 4,
    });
  }

  // ─── 30. Algoritma Favori Sinyalleri ───────────────────────────────
  if (followerGrowthRate > 5 && shareRate > 1.5 && saveRate > 2) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '✨',
      title: 'Algoritma Tarafından Destekleniyorsunuz',
      description:
        'Büyüme hızınız, paylaşım ve kaydetme oranlarınız, algoritmanın sizi aktif olarak öne çıkardığını gösteriyor. Bu momentum kritik — tutarlılığı koruyun!',
      priority: 7,
    });
  }

  // ─── 31. Topluluk Büyütme Stratejisi ──────────────────────────────
  if (engagementRate > 2 && followerGrowth < 500 && weeklyContent >= 3) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '🌱',
      title: 'Topluluk Büyütme Fırsatı',
      description:
        'Etkileşim oranınız sağlıklı ama büyüme yavaş. Yorumlara aktif yanıt verin, hikaye etkileşimlerini artırın, nişinizdeki hesapların yorumlarına değerli katkılar bırakın.',
      priority: 5,
    });
  }

  // ─── 32. Orta Düzey Performans ────────────────────────────────────
  if (followerGrowthRate > -1 && followerGrowthRate < 5 && engagementRate > 1 && engagementRate < 3) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '📊',
      title: 'Stabil Performans — Büyüme Potansiyeli Mevcut',
      description:
        'Hesabınız stabil ama büyüme ivmesi düşük. Mevcut stratejinize trend formatlar, viral ses kullanımı veya kontroversiyel konular ekleyerek çıkış noktası oluşturabilirsiniz.',
      priority: 4,
    });
  }

  // ─── 33. Yüksek Görüntülenme ────────────────────────────────────
  if (totalViews > 100000) {
    insights.push({
      id: generateId(),
      type: 'positive',
      icon: '👁️',
      title: 'Güçlü Erişim Performansı',
      description:
        `Son 30 günde ${totalViews.toLocaleString('tr-TR')} görüntülenme — bu çok iyi! İçerikleriniz geniş bir kitleye ulaşıyor.`,
      priority: 5,
    });
  }

  // ─── 34. Düşük Görüntülenme Uyarısı ──────────────────────────────
  if (totalViews < 5000 && weeklyContent >= 3) {
    insights.push({
      id: generateId(),
      type: 'warning',
      icon: '🔇',
      title: 'Düşük Erişim Uyarısı',
      description:
        'İçerik üretiyorsunuz ama görüntülenme çok düşük. Hook stratejinizi güçlendirin, trend sesleri kullanın ve paylaşım saatlerinizi optimize edin. İlk 3 saniye her şeyi belirler!',
      priority: 8,
    });
  }

  // ─── 35. Kaydetme/Paylaşım Dengesizliği ──────────────────────────
  if (avgSaves > avgShares * 3 && avgShares > 0) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '⚖️',
      title: 'Eğitici İçerik Profili',
      description:
        'Kaydetme sayınız paylaşım sayınızın çok üstünde. İçerikleriniz eğitici/bilgilendirici ağırlıklı. Viral büyüme için duygu tetikleyen, tartışma yaratan veya eğlenceli formatlar da ekleyin.',
      priority: 4,
    });
  }

  if (avgShares > avgSaves * 2 && avgSaves > 0) {
    insights.push({
      id: generateId(),
      type: 'info',
      icon: '📤',
      title: 'Viral İçerik Profili',
      description:
        'Paylaşım sayınız kaydetmeden çok yüksek. İçerikleriniz viral yayılıma uygun ama uzun vadeli değer düşük olabilir. Hem paylaşılabilir hem kaydedilebilir "combo" formatlar deneyin.',
      priority: 4,
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // Sort by priority (descending) and return top 8-12 insights
  // ─────────────────────────────────────────────────────────────────────
  insights.sort((a, b) => b.priority - a.priority);

  // Return between 8 and 12 insights (or fewer if not enough conditions matched)
  const minInsights = 8;
  const maxInsights = 12;

  // If we have fewer than min, pad with fallback insights
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
          'Algoritma tutarlı üreticileri ödüllendirir. Belirli günlerde, belirli saatlerde paylaşım yaparak algoritmada güven oluşturun.',
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
