const scoreCalculator = require('./scoreCalculator');
const insightGenerator = require('./insightGenerator');
const recommendationEngine = require('./recommendationEngine');

class AnalysisService {
  /**
   * Ana analiz motorunu çalıştırır.
   * @param {Object} data Doğrulanmış kullanıcı verileri
   * @returns {Object} Analiz sonuçları
   */
  async runAnalysis(data) {
    try {
      // 1. Skorları hesapla
      const scores = scoreCalculator.calculateAll(data);
      
      // 2. Yorumları/insight'ları üret
      const insights = insightGenerator.generate(data, scores);
      
      // 3. Önerileri üret
      const recommendations = recommendationEngine.generate(data, scores, insights);
      
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

  _getHealthStatus(score) {
    if (score >= 80) return 'Mükemmel';
    if (score >= 60) return 'İyi';
    if (score >= 40) return 'Orta';
    if (score >= 20) return 'Zayıf';
    return 'Kritik';
  }
}

module.exports = new AnalysisService();
