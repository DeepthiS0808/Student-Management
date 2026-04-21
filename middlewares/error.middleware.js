// ─────────────────────────────────────────────────────────────
//  middlewares/error.middleware.js  –  Global Error Handler
// ─────────────────────────────────────────────────────────────
//
//  Express recognises a 4-argument middleware as an error handler.
//  ALL errors passed via next(err) land here.
//
//  Handled error types:
//    1. CastError        → invalid MongoDB ObjectId in URL param
//    2. ValidationError  → Mongoose schema validation failure
//    3. Code 11000       → Duplicate key (unique constraint)
//    4. Fallback         → Everything else → 500
// ─────────────────────────────────────────────────────────────

module.exports = (err, req, res, next) => {
  // Always log the full error for debugging
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  // ── 1. Invalid MongoDB ObjectId ───────────────────────────
  //  Happens when :id in the URL is not a valid 24-char hex string.
  //  Example: GET /api/students/abc  → CastError
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: "${err.value}" is not a valid MongoDB ObjectId`,
    });
  }

  // ── 2. Mongoose Validation Error ──────────────────────────
  //  Happens when required fields are missing or fail min/max rules.
  //  Collect ALL validation messages into one response.
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  }

  // ── 3. Duplicate Key Error (code 11000) ───────────────────
  //  Happens when a unique-indexed field is violated.
  //  e.g. if you add a unique email field later.
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate value: "${err.keyValue[field]}" already exists for field "${field}"`,
    });
  }

  // ── 4. Fallback – Unexpected Errors ───────────────────────
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
