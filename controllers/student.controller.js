const studentService = require("../services/student.service");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

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

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const updated = await studentService.updateStudent(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const deleted = await studentService.deleteStudent(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
