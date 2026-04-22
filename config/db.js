// ─────────────────────────────────────────────────────────────
//  config/db.js  –  MongoDB Atlas connection via Mongoose
// ─────────────────────────────────────────────────────────────
//  WHY THIS FILE?
//  Separating the DB connection from server.js keeps concerns
//  clean. server.js only starts the HTTP server; db.js owns the
//  database lifecycle.
// ─────────────────────────────────────────────────────────────

const mongoose = require("mongoose");
const dns = require("dns");
const { MONGO_URI } = require("./app.config");

// WORKAROUND for Node v24+ on Windows DNS bug
if (process.version.startsWith('v24')) {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

/**
 * connectDB()
 *
 * Establishes an async connection to MongoDB Atlas.
 * - On SUCCESS  -> logs a confirmation message.
 * - On FAILURE  -> logs the error and continues with in-memory data
 *                 so the app can work for demonstration purposes.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`? MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`? MongoDB Connection Failed!`);
    console.error(`Error details: ${error.message}`);
    console.warn("? Starting with in-memory data for demonstration...");
  }
};

module.exports = connectDB;
