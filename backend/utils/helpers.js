/**
 * Shared utility helpers used across services and middleware.
 */

/**
 * Clamp a numeric value between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Safely calculate a percentage (part / total * 100).
 * Returns 0 when total is zero to avoid division-by-zero.
 * @param {number} part
 * @param {number} total
 * @returns {number}
 */
function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return (part / total) * 100;
}

/**
 * Convert a raw 0-100 score into a labelled object with color coding.
 *
 * | Range   | Label     | Color  |
 * |---------|-----------|--------|
 * | 80-100  | Mükemmel  | green  |
 * | 60-79   | İyi       | cyan   |
 * | 40-59   | Orta      | yellow |
 * | 20-39   | Zayıf     | orange |
 * | 0-19    | Kritik    | red    |
 *
 * @param {number} score — raw score (will be clamped to 0-100)
 * @returns {{ score: number, label: string, color: string }}
 */
function formatScore(score) {
  const clamped = clamp(Math.round(score), 0, 100);

  if (clamped >= 80) return { score: clamped, label: 'Mükemmel', color: 'green' };
  if (clamped >= 60) return { score: clamped, label: 'İyi', color: 'cyan' };
  if (clamped >= 40) return { score: clamped, label: 'Orta', color: 'yellow' };
  if (clamped >= 20) return { score: clamped, label: 'Zayıf', color: 'orange' };
  return { score: clamped, label: 'Kritik', color: 'red' };
}

/**
 * Generate a short, reasonably unique identifier (e.g. for insight IDs).
 * Format: 8-char hex string based on timestamp + random component.
 * @returns {string}
 */
function generateId() {
  const timePart = Date.now().toString(36).slice(-4);
  const randPart = Math.random().toString(36).slice(2, 6);
  return `${timePart}${randPart}`;
}

module.exports = {
  clamp,
  calculatePercentage,
  formatScore,
  generateId,
};
