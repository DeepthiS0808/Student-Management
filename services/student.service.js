// ─────────────────────────────────────────────────────────────
//  services/student.service.js  –  Business logic layer
// ─────────────────────────────────────────────────────────────
//
//  RULE: This layer ONLY talks to the database.
//        It knows nothing about HTTP (req / res / status codes).
//        Controllers call these functions and handle HTTP.
//
//  All functions are async/await — no callbacks, no blocking.
// ─────────────────────────────────────────────────────────────

const Student = require("../models/student.model");

// ── CREATE ────────────────────────────────────────────────────
/**
 * createStudent(data)
 *
 * Inserts a new student document into MongoDB.
 * Mongoose validates against the schema BEFORE the DB write,
 * so a ValidationError is thrown automatically if data is bad.
 *
 * @param  {Object} data  – { name, age, course }
 * @returns {Document}    – The saved Mongoose document
 */
const createStudent = async (data) => {
  // Student.create() is shorthand for new Student(data).save()
  const student = await Student.create(data);
  return student;
};

// ── GET ALL (with pagination + search) ────────────────────────
/**
 * getAllStudents({ page, limit, search })
 *
 * Returns a paginated list of students.
 * - search: case-insensitive partial match on the `name` field
 * - page / limit: standard pagination
 *
 * WHY countDocuments separately?
 * Mongoose's .find() + .limit() doesn't give total count.
 * We need countDocuments() to compute total pages on the client.
 *
 * @param  {Object} options
 * @returns {{ total, page, limit, totalPages, data }}
 */
const getAllStudents = async ({ page = 1, limit = 5, search = "" }) => {
  // Build filter object
  const filter = {};
  if (search) {
    // $regex with $options "i" → case-insensitive partial match
    filter.name = { $regex: search, $options: "i" };
  }

  // Run count and find queries in parallel for efficiency
  const [total, data] = await Promise.all([
    Student.countDocuments(filter),
    Student.find(filter)
      .skip((page - 1) * limit)   // skip records for previous pages
      .limit(Number(limit))        // cap results per page
      .sort({ createdAt: -1 }),    // newest first
  ]);

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    data,
  };
};

// ── GET BY ID ─────────────────────────────────────────────────
/**
 * getStudentById(id)
 *
 * Fetches a single student by MongoDB ObjectId.
 * Returns null if not found (controller handles 404).
 *
 * NOTE: If `id` is not a valid ObjectId format, Mongoose throws
 *       a CastError — caught by our global error handler.
 *
 * @param  {string} id  – MongoDB ObjectId string
 * @returns {Document|null}
 */
const getStudentById = async (id) => {
  return await Student.findById(id);
};

// ── UPDATE ────────────────────────────────────────────────────
/**
 * updateStudent(id, data)
 *
 * Finds a student by ID and applies partial updates.
 *
 * Options explained:
 *   new: true       → return the updated doc, not the old one
 *   runValidators: true → re-run schema validation on update fields
 *
 * @param  {string} id    – MongoDB ObjectId string
 * @param  {Object} data  – Partial update fields
 * @returns {Document|null}
 */
const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true, // IMPORTANT: validate on update too
    }
  );
};

// ── DELETE ────────────────────────────────────────────────────
/**
 * deleteStudent(id)
 *
 * Deletes a student document by ID.
 * Returns null if the document was not found (controller → 404).
 *
 * @param  {string} id  – MongoDB ObjectId string
 * @returns {Document|null}  – The deleted document
 */
const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

// ── EXPORTS ───────────────────────────────────────────────────
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
