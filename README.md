# Student Management System — MongoDB Edition

A production-ready REST API built with **Node.js**, **Express.js**, and **MongoDB Atlas** using clean architecture.

---

## 📁 Project Structure

```
Student-Management/
├── config/
│   ├── app.config.js     ← Port + env loader (dotenv lives here)
│   └── db.js             ← MongoDB Atlas connection (Mongoose)
├── models/
│   └── student.model.js  ← Mongoose Schema with full validation
├── services/
│   └── student.service.js← All DB operations (business logic)
├── controllers/
│   └── student.controller.js ← HTTP in/out only (thin layer)
├── routes/
│   └── student.routes.js ← URL → middleware → controller mapping
├── middlewares/
│   ├── validation.middleware.js ← First-gate request validation
│   ├── error.middleware.js      ← Global error handler
│   ├── logger.middleware.js     ← Request logging
│   └── notFound.middleware.js   ← 404 handler
├── app/
│   └── app.js            ← Express app setup
├── .env                  ← 🔒 Environment variables (never commit)
├── .gitignore
├── server.js             ← Entry point (DB connect → HTTP listen)
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs: `express`, `mongoose`, `dotenv`.

### 2. Configure Environment Variables

Open `.env` and replace the placeholder with your **MongoDB Atlas URI**:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_management?retryWrites=true&w=majority
PORT=5000
```

**How to get your Atlas URI:**
1. Log in at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click your cluster → **Connect** → **Connect your application**
3. Copy the connection string and replace `<password>` with your DB user password

> ⚠️ **Never commit `.env` to Git.** It is already in `.gitignore`.

### 3. Start the Server

```bash
node server.js
```

**Expected output:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running at http://localhost:5000
📚 API Base: http://localhost:5000/api/students
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/students` | Create a new student |
| `GET` | `/api/students` | Get all students (paginated + searchable) |
| `GET` | `/api/students/:id` | Get student by ID |
| `PUT` | `/api/students/:id` | Update a student |
| `DELETE` | `/api/students/:id` | Delete a student |

---

## 🧪 Testing with Postman

### ➕ Create a Student
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Deepthi",
  "age": 21,
  "course": "Computer Science"
}
```
**Success Response (201):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": "6634abc123...",
    "name": "Deepthi",
    "age": 21,
    "course": "Computer Science",
    "createdAt": "2024-05-03T10:00:00.000Z"
  }
}
```

---

### 📋 Get All Students (with Pagination & Search)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`
- **Query Params:**
  - `page=1` (default: 1)
  - `limit=5` (default: 5)
  - `search=Dee` (partial, case-insensitive name search)

**Example:** `GET /api/students?page=1&limit=3&search=Dee`

**Success Response (200):**
```json
{
  "success": true,
  "total": 1,
  "page": 1,
  "limit": 3,
  "totalPages": 1,
  "data": [...]
}
```

---

### 🔍 Get Student by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/6634abc123...`

---

### ✏️ Update a Student
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/6634abc123...`
- **Body (raw JSON):**
```json
{
  "name": "Deepthi R",
  "age": 22,
  "course": "Data Science"
}
```

---

### 🗑️ Delete a Student
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/6634abc123...`

---

## ❌ Error Responses

| Scenario | Status | Message |
|----------|--------|---------|
| Missing required fields | `400` | `Validation failed` + errors array |
| Invalid MongoDB ObjectId | `400` | `Invalid ID format: "abc"...` |
| Schema validation failure | `422` | `Validation failed` + errors array |
| Student not found | `404` | `Student not found` |
| Duplicate key | `409` | `Duplicate value: "..."` |
| Server error | `500` | `Internal Server Error` |

---

## ⚠️ Common Mistakes & How to Avoid Them

| Mistake | Fix |
|--------|-----|
| `MONGO_URI` not set in `.env` | Always fill in `.env` before running the server |
| Sending `age` as a string `"21"` | Send as a number `21` in JSON — no quotes |
| Using an old/wrong ObjectId in URL | Copy the `id` from a `POST` or `GET` response |
| `dotenv` not loaded early enough | `app.config.js` calls `require("dotenv").config()` first — never move this |
| Running server before DB connects | `server.js` uses `await connectDB()` before `app.listen()` |
| Forgetting `runValidators: true` on update | Already set in `findByIdAndUpdate` options in service |

---

## 🚀 Production Tips

- Use `nodemon` for development: `npm install -D nodemon` → `nodemon server.js`
- Add MongoDB Atlas **IP Whitelist** in Network Access settings
- Use **strong DB user passwords** and rotate them periodically
- Store secrets in environment-specific `.env` files, never in code