// ─────────────────────────────────────────────────────────────
//  config/db.js  –  MongoDB Atlas connection via Mongoose
// ─────────────────────────────────────────────────────────────
//  WHY THIS FILE?
//  Separating the DB connection from server.js keeps concerns
//  clean. server.js only starts the HTTP server; db.js owns the
//  database lifecycle.
// ─────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * connectDB()
 *
 * Establishes an async connection to MongoDB Atlas.
 * - On SUCCESS  → logs a confirmation message.
 * - On FAILURE  → logs the error and exits (process.exit(1))
 *                 so the app never runs without a database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    // Graceful exit – never run the API without a DB.
    process.exit(1);
  }
};

module.exports = connectDB;
