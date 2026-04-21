// ─────────────────────────────────────────────────────────────
//  server.js  –  Entry point
// ─────────────────────────────────────────────────────────────
//
//  ORDER MATTERS:
//    1. Load env variables via app.config (dotenv.config inside)
//    2. Connect to MongoDB Atlas
//    3. Start the HTTP server ONLY after DB is ready
//
//  This prevents the API from accepting requests before the
//  database connection is established.
// ─────────────────────────────────────────────────────────────

const app = require("./app/app");
const { PORT } = require("./config/app.config");   // dotenv loads here
const connectDB = require("./config/db");

const startServer = async () => {
  // Step 1: Connect to MongoDB Atlas
  await connectDB();

  // Step 2: Start Express only after successful DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 API Base: http://localhost:${PORT}/api/students`);
  });
};

startServer();
