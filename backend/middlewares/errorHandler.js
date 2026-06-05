/**
 * Global error-handling middleware.
 *
 * In development: returns the full stack trace for easier debugging.
 * In production : returns a generic Turkish error message to avoid leaking internals.
 */

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  // Always log to console for server-side observability
  console.error('❌ Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || err.status || 500;

  if (process.env.NODE_ENV === 'production') {
    // Production — safe, generic response
    return res.status(statusCode).json({
      success: false,
      error: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    });
  }

  // Development — verbose response with stack trace
  return res.status(statusCode).json({
    success: false,
    error: err.message,
    stack: err.stack,
    details: err.details || null,
  });
};

module.exports = errorHandler;
