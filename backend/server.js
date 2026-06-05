/**
 * Instagram Analyzer Backend — Main Server Entry Point
 *
 * Boots Express with security middleware, optional MongoDB connection,
 * API routes, and SPA static-file serving in production mode.
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/analysisRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ---------------------------------------------------------------------------
// Core Middleware
// ---------------------------------------------------------------------------

// Security headers
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false,
}));

// CORS — allow frontend dev server in development
app.use(cors({
  origin: NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGIN || true
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Gzip compression for all responses
app.use(compression());

// HTTP request logger
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parse JSON bodies (limit to 1 MB)
app.use(express.json({ limit: '1mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ---------------------------------------------------------------------------
// MongoDB Connection (optional — gracefully falls back to in-memory)
// ---------------------------------------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => {
      console.warn('⚠️  MongoDB connection failed — running without database:', err.message);
    });
} else {
  console.warn('⚠️  MONGODB_URI not set — running in memory-only mode (no persistence)');
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

app.use('/api', apiRoutes);

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ---------------------------------------------------------------------------
// Production Static File Serving & SPA Fallback
// ---------------------------------------------------------------------------

if (NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

  app.use(express.static(frontendDist));

  // SPA fallback — serve index.html for any non-API route
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint bulunamadı.' });
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// ---------------------------------------------------------------------------
// Global Error Handler
// ---------------------------------------------------------------------------

app.use(errorHandler);

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`
  ┌──────────────────────────────────────────┐
  │  Instagram Analyzer API                  │
  │  Environment : ${NODE_ENV.padEnd(24)}│
  │  Port        : ${String(PORT).padEnd(24)}│
  │  Database    : ${(MONGODB_URI ? 'MongoDB' : 'In-Memory').padEnd(24)}│
  └──────────────────────────────────────────┘
  `);
});

module.exports = app;
