// ─────────────────────────────────────────────────────────────
//  config/app.config.js  –  Central app configuration
// ─────────────────────────────────────────────────────────────
//  dotenv is loaded HERE (as early as possible) so every other
//  module that requires this file will already have process.env
//  populated.
// ─────────────────────────────────────────────────────────────

require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
};