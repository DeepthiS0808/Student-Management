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
  // Standard connection string format to bypass Node v24 SRV/DNS issues
  MONGO_URI: process.env.MONGO_URI || "mongodb://deepthis100d_db_user:Deepthis%402008@ac-klbjahs-shard-00-00.uhxsxzh.mongodb.net:27017,ac-klbjahs-shard-00-01.uhxsxzh.mongodb.net:27017,ac-klbjahs-shard-00-02.uhxsxzh.mongodb.net:27017/student_management?ssl=true&replicaSet=atlas-qh9kij-shard-0&authSource=admin&appName=Cluster0",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_for_dev_only_change_in_production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
};