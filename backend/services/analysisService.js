const scoreCalculator = require('./scoreCalculator');
const insightGenerator = require('./insightGenerator');
const recommendationEngine = require('./recommendationEngine');

class AnalysisService {
  /**
   * Ana analiz motorunu çalıştırır.
   * Ham form verilerinden oranları hesaplar, sonra analize gönderir.
   * @param {Object} rawData Doğrulanmış kullanıcı verileri (ham sayılar)
   * @returns {Object} Analiz sonuçları
   */
  async runAnalysis(rawData) {
    try {
      // Ham verilerden oranları otomatik hesapla
      const data = this._enrichData(rawData);

      // 1. Skorları hesapla
      const scores = scoreCalculator.calculateAllScores(data);

      // 2. Yorumları/insight'ları üret
      const insights = insightGenerator.generateInsights(data, scores);

      // 3. Önerileri üret
      const recommendations = recommendationEngine.generateRecommendations(scores, data);

      // 4. Sonuç objesini formatla
      return {
        username: data.username,
        niche: data.niche,
        summary: {
          overallHealth: scores.overallHealth,
          status: this._getHealthStatus(scores.overallHealth.score)
        },
        scores: {
          contentScore: scores.contentScore,
          algorithmScore: scores.algorithmScore,
          followerConversionScore: scores.followerConversionScore,
          viralPotentialScore: scores.viralPotentialScore
        },
        insights,
        recommendations,
        analyzedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Analysis execution failed:', error);
      throw new Error('Analiz motoru çalıştırılırken bir hata oluştu.');
    }
  }

  /**
   * Ham form verilerinden türetilmiş metrikleri hesaplar.
   * Kullanıcının bilemeyeceği oranlar burada otomatik hesaplanır.
   */
  _enrichData(raw) {
    const followerCount = Number(raw.followerCount) || 1;
    const followerGrowth = Number(raw.followerGrowth) || 0;
    const totalViews = Number(raw.totalViews) || 0;
    const topVideoViews = Number(raw.topVideoViews) || 0;
    const avgReelsViews = Number(raw.avgReelsViews) || 1;
    const weeklyContent = Number(raw.weeklyContent) || 0;
    const avgLikes = Number(raw.avgLikes) || 0;
    const avgComments = Number(raw.avgComments) || 0;
    const avgShares = Number(raw.avgShares) || 0;
    const avgSaves = Number(raw.avgSaves) || 0;

    // Türetilen metrikler
    const engagementRate = followerCount > 0
      ? ((avgLikes + avgComments) / followerCount) * 100
      : 0;

    const saveRate = avgReelsViews > 0
      ? (avgSaves / avgReelsViews) * 100
      : 0;

    const shareRate = avgReelsViews > 0
      ? (avgShares / avgReelsViews) * 100
      : 0;

    // Takipçi büyüme oranı (% olarak)
    const followerGrowthRate = followerCount > 0
      ? (followerGrowth / followerCount) * 100
      : 0;

    // Viral sapma oranı
    const viralRatio = avgReelsViews > 0
      ? topVideoViews / avgReelsViews
      : 1;

    return {
      username: raw.username,
      niche: raw.niche,
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
      // Hesaplanan oranlar
      engagementRate: Math.round(engagementRate * 100) / 100,
      saveRate: Math.round(saveRate * 100) / 100,
      shareRate: Math.round(shareRate * 100) / 100,
      followerGrowthRate: Math.round(followerGrowthRate * 100) / 100,
      viralRatio: Math.round(viralRatio * 100) / 100,
    };
  }

  _getHealthStatus(score) {
    if (score >= 80) return 'Mükemmel';
    if (score >= 60) return 'İyi';
    if (score >= 40) return 'Orta';
    if (score >= 20) return 'Zayıf';
    return 'Kritik';
  }
}

module.exports = new AnalysisService();
