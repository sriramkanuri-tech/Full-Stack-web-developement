// server.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend at port 5173
app.use(cors({ origin: "http://localhost:5173" }));

// Route 1: Simple message
app.get("/api/v1/message", (req, res) => {
  res.json({ text: "Welcome sriramkanuri" });
});

// Route 2: Student records
app.get("/api/v1/students", (req, res) => {
  res.json([
    { id: 1, name: "Ravi", branch: "ECE" },
    { id: 2, name: "sriramkanuri", branch: "ECE" }
  ]);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
