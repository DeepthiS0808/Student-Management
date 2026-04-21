const fs = require("fs");
const path = require("path");
const Student = require("../models/student.model");
const generateId = require("../utils/generateId");

const filePath = path.join(__dirname, "../data/students.json");

let students = [];

// Load from file if exists
if (fs.existsSync(filePath)) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    students = fileContent ? JSON.parse(fileContent) : [];
  } catch (err) {
    console.error("Error parsing students.json, initializing with empty array");
    students = [];
  }
}

// Save helper
const saveToFile = () => {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

const createStudent = async (data) => {
  const student = new Student({
    id: generateId(),
    ...data,
    createdAt: new Date(),
  });

  students.push(student);
  saveToFile();

  return student;
};

const getAllStudents = async ({ page = 1, limit = 5, search = "" }) => {
  let filtered = students;

  if (search) {
    filtered = students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    total: filtered.length,
    data: filtered.slice(start, end),
  };
};

const getStudentById = async (id) => {
  return students.find((s) => s.id === id);
};

const updateStudent = async (id, data) => {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  saveToFile();

  return students[index];
};

const deleteStudent = async (id) => {
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  saveToFile();

  return true;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
