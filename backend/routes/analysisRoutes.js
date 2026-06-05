/**
 * Analysis routes — POST /analyze
 *
 * Applies rate-limiting and input validation before
 * forwarding the request to the analysis controller.
 */

const express = require('express');
const router = express.Router();

const analysisRateLimiter = require('../middlewares/rateLimiter');
const { analyzeValidationRules, handleValidationErrors } = require('../middlewares/validator');
const analysisController = require('../controllers/analysisController');

// POST /api/analyze
router.post(
  '/analyze',
  analysisRateLimiter,
  analyzeValidationRules,
  handleValidationErrors,
  analysisController.analyze,
);

module.exports = router;
