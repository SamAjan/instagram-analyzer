/**
 * Input validation middleware for the POST /api/analyze endpoint.
 *
 * Validates all 12 input fields using express-validator.
 * Returns Turkish error messages when validation fails.
 */

const { body, validationResult } = require('express-validator');

// ---------------------------------------------------------------------------
// Validation Rules
// ---------------------------------------------------------------------------

const analyzeValidationRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Kullanıcı adı zorunludur.')
    .isString().withMessage('Kullanıcı adı metin olmalıdır.')
    .isLength({ min: 1, max: 30 }).withMessage('Kullanıcı adı 1-30 karakter arasında olmalıdır.'),

  body('niche')
    .trim()
    .notEmpty().withMessage('Niş alanı zorunludur.')
    .isString().withMessage('Niş alanı metin olmalıdır.'),

  body('followerGrowth')
    .notEmpty().withMessage('Takipçi artışı zorunludur.')
    .isNumeric().withMessage('Takipçi artışı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Takipçi artışı 0 veya daha büyük olmalıdır.'),

  body('totalViews')
    .notEmpty().withMessage('Toplam görüntülenme zorunludur.')
    .isNumeric().withMessage('Toplam görüntülenme sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Toplam görüntülenme 0 veya daha büyük olmalıdır.'),

  body('topVideoViews')
    .notEmpty().withMessage('En çok izlenen video görüntülenmesi zorunludur.')
    .isNumeric().withMessage('En çok izlenen video görüntülenmesi sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('En çok izlenen video görüntülenmesi 0 veya daha büyük olmalıdır.'),

  body('avgReelsViews')
    .notEmpty().withMessage('Ortalama reels izlenmesi zorunludur.')
    .isNumeric().withMessage('Ortalama reels izlenmesi sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Ortalama reels izlenmesi 0 veya daha büyük olmalıdır.'),

  body('bestFollowerVideo')
    .notEmpty().withMessage('En çok takipçi getiren video görüntülenmesi zorunludur.')
    .isNumeric().withMessage('En çok takipçi getiren video görüntülenmesi sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Bu değer 0 veya daha büyük olmalıdır.'),

  body('last14DaysChange')
    .notEmpty().withMessage('Son 14 gün görüntülenme değişimi zorunludur.')
    .isNumeric().withMessage('Son 14 gün görüntülenme değişimi sayısal bir değer olmalıdır.'),
    // Note: last14DaysChange CAN be negative — no min-0 constraint

  body('engagementRate')
    .notEmpty().withMessage('Etkileşim oranı zorunludur.')
    .isNumeric().withMessage('Etkileşim oranı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Etkileşim oranı 0 veya daha büyük olmalıdır.'),

  body('weeklyContent')
    .notEmpty().withMessage('Haftalık içerik sayısı zorunludur.')
    .isNumeric().withMessage('Haftalık içerik sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Haftalık içerik sayısı 0 veya daha büyük olmalıdır.'),

  body('saveRate')
    .notEmpty().withMessage('Kaydetme oranı zorunludur.')
    .isNumeric().withMessage('Kaydetme oranı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Kaydetme oranı 0 veya daha büyük olmalıdır.'),

  body('shareRate')
    .notEmpty().withMessage('Paylaşım oranı zorunludur.')
    .isNumeric().withMessage('Paylaşım oranı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Paylaşım oranı 0 veya daha büyük olmalıdır.'),
];

// ---------------------------------------------------------------------------
// Validation Result Handler
// ---------------------------------------------------------------------------

/**
 * Middleware that checks express-validator results and returns errors
 * in a structured format with Turkish messages.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
      value: err.value,
    }));

    return res.status(400).json({
      success: false,
      error: 'Girdi doğrulama hatası. Lütfen alanları kontrol edin.',
      validationErrors: formattedErrors,
    });
  }

  next();
};

module.exports = {
  analyzeValidationRules,
  handleValidationErrors,
};
