// ─────────────────────────────────────────────────────────────
//  middlewares/validation.middleware.js  –  Request validation
// ─────────────────────────────────────────────────────────────
//
//  WHY validate here AND in the Mongoose schema?
//
//  This middleware acts as a FIRST GATE — it rejects obviously
//  bad requests BEFORE they even touch the database layer.
//  The Mongoose schema is the SECOND GATE — it catches anything
//  that slips through (e.g. wrong types, out-of-range values).
//
//  Two-gate validation = zero bad data reaching MongoDB.
// ─────────────────────────────────────────────────────────────

module.exports = (req, res, next) => {
  const { name, age, course } = req.body;

  const errors = [];

  // ── name ──────────────────────────────────────────────────
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  // ── age ───────────────────────────────────────────────────
  if (age === undefined || age === null || age === "") {
    errors.push("age is required");
  } else if (typeof age !== "number" || !Number.isFinite(age)) {
    errors.push("age must be a valid number");
  } else if (age < 1 || age > 120) {
    errors.push("age must be between 1 and 120");
  }

  // ── course ────────────────────────────────────────────────
  if (!course || typeof course !== "string" || course.trim().length === 0) {
    errors.push("course is required and must be a non-empty string");
  }

  // ── Return all errors at once ─────────────────────────────
  //  Better UX: user sees ALL problems in one response,
  //  not one error at a time.
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};
