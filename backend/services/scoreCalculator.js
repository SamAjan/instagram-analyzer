/**
 * Score Calculator Service
 *
 * Computes 5 key performance scores (0-100) from Instagram metrics:
 *   1. contentScore       — content quality & consistency
 *   2. algorithmScore     — algorithm favor / keşfet performance
 *   3. followerConversionScore — views → follower conversion efficiency
 *   4. viralPotentialScore — viral breakout potential
 *   5. overallHealth      — weighted composite
 *
 * All scores are returned with Turkish labels and color codes via formatScore().
 */

const { clamp, formatScore, calculatePercentage } = require('../utils/helpers');

// ---------------------------------------------------------------------------
// 1. Content Score
// ---------------------------------------------------------------------------

/**
 * Evaluates content quality based on posting frequency, save rate,
 * share rate, and engagement rate.
 */
function calculateContentScore({ weeklyContent, saveRate, shareRate, engagementRate }) {
  let base = 0;

  // Posting frequency base
  if (weeklyContent >= 7) {
    base = 65;
  } else if (weeklyContent >= 5) {
    base = 55;
  } else if (weeklyContent >= 4) {
    base = 45;
  } else if (weeklyContent >= 3) {
    base = 30;
  } else if (weeklyContent >= 1) {
    base = 18;
  } else {
    base = 5;
  }

  // Granular frequency bonus (reward consistency)
  base += clamp(weeklyContent * 1.5, 0, 12);

  // Save rate bonus — signals long-term content value
  if (saveRate > 5) base += 12;
  else if (saveRate > 3) base += 8;
  else if (saveRate > 1.5) base += 4;
  else if (saveRate < 0.5) base -= 3;

  // Share rate bonus — signals viral-worthy content
  if (shareRate > 3) base += 10;
  else if (shareRate > 2) base += 7;
  else if (shareRate > 1) base += 3;

  // Engagement rate bonus
  if (engagementRate > 5) base += 8;
  else if (engagementRate > 3) base += 5;
  else if (engagementRate > 1.5) base += 2;
  else if (engagementRate < 0.5) base -= 5;

  return formatScore(clamp(base, 0, 100));
}

// ---------------------------------------------------------------------------
// 2. Algorithm Score
// ---------------------------------------------------------------------------

/**
 * Evaluates how well the account is performing in the Instagram algorithm.
 * Uses follower growth rate and view-to-follower ratio as proxy signals.
 */
function calculateAlgorithmScore({ followerGrowthRate, totalViews, followerCount, avgReelsViews, engagementRate, shareRate, saveRate }) {
  let base = 0;

  // Follower growth rate as primary trend signal
  if (followerGrowthRate > 20) {
    base = 85;
  } else if (followerGrowthRate > 10) {
    base = 72;
  } else if (followerGrowthRate > 5) {
    base = 60;
  } else if (followerGrowthRate > 2) {
    base = 48;
  } else if (followerGrowthRate > 0) {
    base = 35;
  } else if (followerGrowthRate > -2) {
    base = 22;
  } else {
    base = 10;
  }

  // Views-to-follower ratio — healthy accounts have high reach relative to size
  const viewsPerFollower = followerCount > 0
    ? totalViews / followerCount
    : totalViews > 0 ? 5 : 0;

  if (viewsPerFollower > 20) base += 10;
  else if (viewsPerFollower > 10) base += 7;
  else if (viewsPerFollower > 5) base += 4;
  else if (viewsPerFollower > 2) base += 2;

  // Engagement signals boost algorithm favor
  if (engagementRate > 4) base += 4;
  if (shareRate > 2) base += 3;
  if (saveRate > 3) base += 3;

  return formatScore(clamp(base, 0, 100));
}

// ---------------------------------------------------------------------------
// 3. Follower Conversion Score
// ---------------------------------------------------------------------------

/**
 * Measures how efficiently views convert into new followers.
 */
function calculateFollowerConversionScore({ followerGrowth, totalViews, followerCount, followerGrowthRate }) {
  const conversionRate = calculatePercentage(followerGrowth, totalViews);
  let base = 0;

  // Conversion rate tiers
  if (conversionRate > 3) {
    base = 85;
  } else if (conversionRate > 2) {
    base = 72;
  } else if (conversionRate > 1) {
    base = 58;
  } else if (conversionRate > 0.5) {
    base = 42;
  } else if (conversionRate > 0.2) {
    base = 25;
  } else {
    base = 10;
  }

  // Absolute follower growth bonus
  if (followerGrowth > 5000) base += 8;
  else if (followerGrowth > 2000) base += 5;
  else if (followerGrowth > 1000) base += 3;

  // Growth rate bonus
  if (followerGrowthRate > 10) base += 5;
  else if (followerGrowthRate > 5) base += 3;

  return formatScore(clamp(base, 0, 100));
}

// ---------------------------------------------------------------------------
// 4. Viral Potential Score
// ---------------------------------------------------------------------------

/**
 * Predicts the account's potential for viral breakout content
 * based on top-video spike vs average, share rate, and engagement.
 */
function calculateViralPotentialScore({ topVideoViews, avgReelsViews, shareRate, engagementRate, followerGrowth, totalViews, viralRatio }) {
  const ratio = viralRatio || (avgReelsViews > 0 ? topVideoViews / avgReelsViews : 1);
  let base = 0;

  // Viral ratio tiers
  if (ratio > 10) {
    base = 80;
  } else if (ratio > 7) {
    base = 72;
  } else if (ratio > 5) {
    base = 60;
  } else if (ratio > 3) {
    base = 48;
  } else if (ratio > 2) {
    base = 35;
  } else {
    base = 20;
  }

  // Penalize extreme spikes that don't convert
  if (ratio > 10) {
    const conversionRate = calculatePercentage(followerGrowth, totalViews);
    if (conversionRate < 0.5) {
      base -= 10;
    }
  }

  // Share rate — strong viral amplification signal
  if (shareRate > 4) base += 12;
  else if (shareRate > 3) base += 9;
  else if (shareRate > 2) base += 6;
  else if (shareRate > 1) base += 3;

  // Engagement rate — engaged audiences amplify viral potential
  if (engagementRate > 5) base += 8;
  else if (engagementRate > 3) base += 5;
  else if (engagementRate > 1.5) base += 2;

  return formatScore(clamp(base, 0, 100));
}

// ---------------------------------------------------------------------------
// 5. Overall Health (weighted composite)
// ---------------------------------------------------------------------------

/**
 * Computes a weighted average of the four sub-scores.
 * Weights: content 25%, algorithm 30%, conversion 25%, viral 20%
 */
function calculateOverallHealth(contentScore, algorithmScore, conversionScore, viralScore) {
  const weighted =
    contentScore.score * 0.25 +
    algorithmScore.score * 0.30 +
    conversionScore.score * 0.25 +
    viralScore.score * 0.20;

  return formatScore(weighted);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculate all five scores from the enriched input data.
 * @param {object} data — enriched input metrics (with calculated rates)
 * @returns {{ contentScore, algorithmScore, followerConversionScore, viralPotentialScore, overallHealth }}
 */
function calculateAllScores(data) {
  const contentScore = calculateContentScore(data);
  const algorithmScore = calculateAlgorithmScore(data);
  const followerConversionScore = calculateFollowerConversionScore(data);
  const viralPotentialScore = calculateViralPotentialScore(data);
  const overallHealth = calculateOverallHealth(
    contentScore,
    algorithmScore,
    followerConversionScore,
    viralPotentialScore,
  );

  return {
    contentScore,
    algorithmScore,
    followerConversionScore,
    viralPotentialScore,
    overallHealth,
  };
}

module.exports = { calculateAllScores };
