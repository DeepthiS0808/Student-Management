// ─────────────────────────────────────────────────────────────
//  models/student.model.js  –  Mongoose Schema & Model
// ─────────────────────────────────────────────────────────────
//
//  WHY MONGOOSE SCHEMA?
//  Unlike a plain JS class, a Mongoose Schema gives you:
//    • Automatic validation before any DB write
//    • Type casting (e.g. "20" → 20 for Number fields)
//    • Built-in timestamps, virtuals, and hooks
//    • MongoDB _id out of the box (no generateId utility needed)
// ─────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // ── name ──────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,               // remove accidental leading/trailing spaces
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    // ── age ───────────────────────────────────────────────────
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
      max: [120, "Age cannot exceed 120"],
    },

    // ── course ────────────────────────────────────────────────
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      minlength: [2, "Course must be at least 2 characters"],
      maxlength: [150, "Course cannot exceed 150 characters"],
    },
  },
  {
    // ── Schema options ────────────────────────────────────────
    timestamps: {
      createdAt: "createdAt", // auto-managed by Mongoose
      updatedAt: "updatedAt",
    },
    // Remove __v (internal Mongoose version key) from API responses
    versionKey: false,
  }
);

// ── Clean JSON output ─────────────────────────────────────────
// When res.json() calls .toJSON() on a document, this transform
// renames _id → id so the API surface stays consistent and
// consumer-friendly.
studentSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Student", studentSchema);
