/**
 * Rate limiter middleware for the /api/analyze endpoint.
 *
 * Restricts each IP to 10 requests per 15-minute window to prevent abuse
 * while still allowing reasonable usage during a single session.
 */

const rateLimit = require('express-rate-limit');

const analysisRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 requests per window
  standardHeaders: true,     // Return rate-limit info in the `RateLimit-*` headers
  legacyHeaders: false,      // Disable the `X-RateLimit-*` headers

  // Turkish error message
  message: {
    success: false,
    error: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
    retryAfter: '15 dakika',
  },

  // Use the key generator to identify clients by IP
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown';
  },
});

module.exports = analysisRateLimiter;
