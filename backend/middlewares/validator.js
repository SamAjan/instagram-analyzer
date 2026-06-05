/**
 * Input validation middleware for the POST /api/analyze endpoint.
 *
 * Validates all input fields using express-validator.
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

  body('followerCount')
    .notEmpty().withMessage('Toplam takipçi sayısı zorunludur.')
    .isNumeric().withMessage('Toplam takipçi sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Toplam takipçi sayısı 0 veya daha büyük olmalıdır.'),

  body('followerGrowth')
    .notEmpty().withMessage('Takipçi artışı zorunludur.')
    .isNumeric().withMessage('Takipçi artışı sayısal bir değer olmalıdır.'),

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

  body('weeklyContent')
    .notEmpty().withMessage('Haftalık içerik sayısı zorunludur.')
    .isNumeric().withMessage('Haftalık içerik sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Haftalık içerik sayısı 0 veya daha büyük olmalıdır.'),

  body('avgLikes')
    .notEmpty().withMessage('Ortalama beğeni sayısı zorunludur.')
    .isNumeric().withMessage('Ortalama beğeni sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Ortalama beğeni sayısı 0 veya daha büyük olmalıdır.'),

  body('avgComments')
    .notEmpty().withMessage('Ortalama yorum sayısı zorunludur.')
    .isNumeric().withMessage('Ortalama yorum sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Ortalama yorum sayısı 0 veya daha büyük olmalıdır.'),

  body('avgShares')
    .notEmpty().withMessage('Ortalama paylaşım sayısı zorunludur.')
    .isNumeric().withMessage('Ortalama paylaşım sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Ortalama paylaşım sayısı 0 veya daha büyük olmalıdır.'),

  body('avgSaves')
    .notEmpty().withMessage('Ortalama kaydetme sayısı zorunludur.')
    .isNumeric().withMessage('Ortalama kaydetme sayısı sayısal bir değer olmalıdır.')
    .custom((v) => Number(v) >= 0).withMessage('Ortalama kaydetme sayısı 0 veya daha büyük olmalıdır.'),
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
