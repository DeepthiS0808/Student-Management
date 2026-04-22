const express = require("express");
const cors = require("cors");
const app = express();

const studentRoutes = require("../routes/student.routes");
const authRoutes = require("../routes/auth.routes");
const logger = require("../middlewares/logger.middleware");
const errorHandler = require("../middlewares/error.middleware");
const notFound = require("../middlewares/notFound.middleware");

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
