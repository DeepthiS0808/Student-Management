/**
 * Mock Student Service
 * Simulates API calls with async/await and setTimeout.
 * Uses localStorage for persistence during the session.
 */

const STORAGE_KEY = 'sms_students';

const initialData = [
  { id: '1', name: 'Alice Johnson', age: 20, course: 'Computer Science' },
  { id: '2', name: 'Bob Smith', age: 22, course: 'Information Technology' },
  { id: '3', name: 'Charlie Brown', age: 21, course: 'Mechanical Engineering' },
];

const getStudentsFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initialData;
};

const saveStudentsToStorage = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export const studentService = {
  // Simulate fetching all students
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStudentsFromStorage());
      }, 800); // 800ms delay to simulate network
    });
  },

  // Simulate fetching a single student by ID
  getById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = getStudentsFromStorage();
        resolve(students.find((s) => s.id === id));
      }, 500);
    });
  },

  // Simulate adding a new student
  create: async (studentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = getStudentsFromStorage();
        const newStudent = {
          ...studentData,
          id: Math.random().toString(36).substr(2, 9),
        };
        const updatedStudents = [...students, newStudent];
        saveStudentsToStorage(updatedStudents);
        resolve(newStudent);
      }, 1000);
    });
  },

  // Simulate updating an existing student
  update: async (id, studentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = getStudentsFromStorage();
        const index = students.findIndex((s) => s.id === id);
        if (index !== -1) {
          students[index] = { ...students[index], ...studentData };
          saveStudentsToStorage(students);
          resolve(students[index]);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  },

  // Simulate deleting a student
  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const students = getStudentsFromStorage();
        const updatedStudents = students.filter((s) => s.id !== id);
        saveStudentsToStorage(updatedStudents);
        resolve(true);
      }, 700);
    });
  },
};
