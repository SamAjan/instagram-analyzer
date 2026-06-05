/**
 * Mongoose schema for persisting analysis results (optional).
 *
 * Used only when a MongoDB connection is available.
 * If the app runs in memory-only mode this model is never invoked.
 */

const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    // Account identifier
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    // Content niche / vertical
    niche: {
      type: String,
      required: true,
      trim: true,
    },

    // Raw input data snapshot
    inputData: {
      followerGrowth: Number,
      totalViews: Number,
      topVideoViews: Number,
      avgReelsViews: Number,
      bestFollowerVideo: Number,
      last14DaysChange: Number,
      engagementRate: Number,
      weeklyContent: Number,
      saveRate: Number,
      shareRate: Number,
    },

    // Calculated score objects
    scores: {
      contentScore: {
        score: Number,
        label: String,
        color: String,
      },
      algorithmScore: {
        score: Number,
        label: String,
        color: String,
      },
      followerConversionScore: {
        score: Number,
        label: String,
        color: String,
      },
      viralPotentialScore: {
        score: Number,
        label: String,
        color: String,
      },
      overallHealth: {
        score: Number,
        label: String,
        color: String,
      },
    },

    // Dynamic insights array
    insights: [
      {
        id: String,
        type: { type: String, enum: ['positive', 'warning', 'critical', 'info'] },
        icon: String,
        title: String,
        description: String,
        priority: Number,
      },
    ],

    // Strategic recommendations array
    recommendations: [
      {
        title: String,
        description: String,
        actionItems: [String],
        priority: Number,
      },
    ],

    // Timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We manage createdAt ourselves
  },
);

// Index on createdAt for TTL / cleanup queries
analysisSchema.index({ createdAt: 1 });

// Additional index for username lookups
analysisSchema.index({ username: 1 });

module.exports = mongoose.model('Analysis', analysisSchema);
