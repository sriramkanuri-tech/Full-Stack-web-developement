const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// In-memory student data
let students = [
  {
    id: 1,
    name: "Ravi",
    branch: "ECE",
  },
  {
    id: 2,
    name: "sriramkanuri",
    branch: "ECE",
  },
];

// ======================================================
// GET - Simple Message
// ======================================================

app.get("/api/v1/message", (req, res) => {
  res.json({
    text: "Welcome sriramkanuri",
  });
});

// ======================================================
// GET - Get All Students
// ======================================================

app.get("/api/v1/students", (req, res) => {
  res.json(students);
});

// ======================================================
// GET - Get Student By ID
// ======================================================

app.get("/api/v1/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

// ======================================================
// POST - Add New Student
// ======================================================

app.post("/api/v1/students", (req, res) => {
  const { name, branch } = req.body;

  // Validation
  if (!name || !branch) {
    return res.status(400).json({
      message: "Name and branch are required",
    });
  }

  // Generate new ID
  const newId =
    students.length > 0
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1;

  const newStudent = {
    id: newId,
    name: name,
    branch: branch,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

// ======================================================
// PUT - Update Complete Student
// ======================================================

app.put("/api/v1/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const { name, branch } = req.body;

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  if (!name || !branch) {
    return res.status(400).json({
      message: "Name and branch are required for PUT",
    });
  }

  students[index] = {
    id: id,
    name: name,
    branch: branch,
  };

  res.json({
    message: "Student updated successfully",
    student: students[index],
  });
});

// ======================================================
// PATCH - Partially Update Student
// ======================================================

app.patch("/api/v1/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, branch } = req.body;

  if (name !== undefined) {
    student.name = name;
  }

  if (branch !== undefined) {
    student.branch = branch;
  }

  res.json({
    message: "Student partially updated successfully",
    student: student,
  });
});

// ======================================================
// DELETE - Delete Student
// ======================================================

app.delete("/api/v1/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

// ======================================================
// Start Server
// ======================================================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});