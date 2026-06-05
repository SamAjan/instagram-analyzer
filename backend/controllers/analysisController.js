/**
 * Analysis controller — thin layer between routes and business logic.
 *
 * Extracts validated body fields, delegates to analysisService,
 * and returns the structured result or forwards errors.
 */

const analysisService = require('../services/analysisService');

/**
 * POST /api/analyze
 * Runs the full Instagram analysis pipeline and returns results.
 */
const analyze = async (req, res, next) => {
  try {
    const {
      username,
      niche,
      followerGrowth,
      totalViews,
      topVideoViews,
      avgReelsViews,
      bestFollowerVideo,
      last14DaysChange,
      engagementRate,
      weeklyContent,
      saveRate,
      shareRate,
    } = req.body;

    // Coerce string-typed numbers that pass validation
    const data = {
      username: String(username).trim(),
      niche: String(niche).trim(),
      followerGrowth: Number(followerGrowth),
      totalViews: Number(totalViews),
      topVideoViews: Number(topVideoViews),
      avgReelsViews: Number(avgReelsViews),
      bestFollowerVideo: Number(bestFollowerVideo),
      last14DaysChange: Number(last14DaysChange),
      engagementRate: Number(engagementRate),
      weeklyContent: Number(weeklyContent),
      saveRate: Number(saveRate),
      shareRate: Number(shareRate),
    };

    const result = await analysisService.runAnalysis(data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyze };
