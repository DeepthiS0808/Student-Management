const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");
const validate = require("../middlewares/validation.middleware");
const { protect } = require("../middlewares/auth.middleware");

// Protect all routes below this line
router.use(protect);

router.post("/", validate, controller.createStudent);
router.get("/", controller.getAllStudents);
router.get("/:id", controller.getStudentById);
router.put("/:id", validate, controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
