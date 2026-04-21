// ─────────────────────────────────────────────────────────────
//  controllers/student.controller.js  –  HTTP layer only
// ─────────────────────────────────────────────────────────────
//
//  RULE: Controllers are THIN.
//        They only:  1. Extract data from req
//                    2. Call the service
//                    3. Send the HTTP response
//        ALL business logic lives in the service layer.
// ─────────────────────────────────────────────────────────────

const studentService = require("../services/student.service");

// ── POST /api/students ────────────────────────────────────────
exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (err) {
    next(err); // forwarded to global error handler
  }
};

// ── GET /api/students ─────────────────────────────────────────
// Supports:  ?page=1&limit=5&search=John
exports.getAllStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const result = await studentService.getAllStudents({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/students/:id ─────────────────────────────────────
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/students/:id ─────────────────────────────────────
exports.updateStudent = async (req, res, next) => {
  try {
    const updated = await studentService.updateStudent(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/students/:id ──────────────────────────────────
exports.deleteStudent = async (req, res, next) => {
  try {
    const deleted = await studentService.deleteStudent(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
