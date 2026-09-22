const express = require("express");

const app = express();
const PORT = 3000;

// ======================================================
// MIDDLEWARE
// ======================================================

// Allows Express to read JSON request bodies
app.use(express.json());

// ======================================================
// STUDENT DATA
// ======================================================

let students = [
    {
        id: 1,
        name: "Sriram",
        age: 18,
        course: "ECE"
    },
    {
        id: 2,
        name: "Rahul",
        age: 19,
        course: "CSE"
    }
];

// ======================================================
// GET - GET ALL STUDENTS
// ======================================================

app.get("/api/v1/students", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        students: students
    });
});

// ======================================================
// GET - GET SINGLE STUDENT
// ======================================================

app.get("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        student: student
    });
});

// ======================================================
// POST - ADD NEW STUDENT
// ======================================================

app.post("/api/v1/students", (req, res) => {
    const { name, age, course } = req.body;

    // Validate input
    if (!name || age === undefined || !course) {
        return res.status(400).json({
            success: false,
            message: "name, age and course are required"
        });
    }

    // Generate new ID
    const newId =
        students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1;

    const newStudent = {
        id: newId,
        name: name,
        age: Number(age),
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student added successfully",
        student: newStudent
    });
});

// ======================================================
// PUT - REPLACE COMPLETE STUDENT
// ======================================================

app.put("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    // PUT requires the complete resource
    if (!name || age === undefined || !course) {
        return res.status(400).json({
            success: false,
            message: "name, age and course are required for PUT"
        });
    }

    const updatedStudent = {
        id: id,
        name: name,
        age: Number(age),
        course: course
    };

    students[index] = updatedStudent;

    res.status(200).json({
        success: true,
        message: "Student replaced successfully",
        student: updatedStudent
    });
});

// ======================================================
// PATCH - UPDATE PART OF STUDENT
// ======================================================

app.patch("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    // Update only fields that are provided
    if (req.body.name !== undefined) {
        student.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        student.age = Number(req.body.age);
    }

    if (req.body.course !== undefined) {
        student.course = req.body.course;
    }

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: student
    });
});

// ======================================================
// DELETE - DELETE STUDENT
// ======================================================

app.delete("/api/v1/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

// ======================================================
// HEAD - HEADERS ONLY
// ======================================================

app.head("/api/v1/students", (req, res) => {
    res.set("X-API-Name", "Student Records API");
    res.set("X-API-Version", "v1");

    res.status(200).end();
});

// ======================================================
// OPTIONS - ALLOWED HTTP METHODS
// ======================================================

app.options("/api/v1/students", (req, res) => {
    res.set(
        "Allow",
        "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
    );

    res.status(204).end();
});

// OPTIONS for individual student
app.options("/api/v1/students/:id", (req, res) => {
    res.set(
        "Allow",
        "GET, PUT, PATCH, DELETE, HEAD, OPTIONS"
    );

    res.status(204).end();
});

// ======================================================
// HOME / API STATUS
// ======================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student Records API is running",
        version: "v1",
        endpoint: "/api/v1/students",
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HEAD",
            "OPTIONS"
        ]
    });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
    console.log("========================================");
    console.log(" Student Records API");
    console.log("========================================");
    console.log(` Server running on port ${PORT}`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` API: http://localhost:${PORT}/api/v1/students`);
    console.log("========================================");
});