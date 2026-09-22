import React, { useState } from "react";

const API = "http://localhost:3000/api/v1";

function App() {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");

  const [result, setResult] = useState("");

  // ======================================================
  // GET MESSAGE
  // ======================================================

  const fetchMessage = async () => {
    try {
      const response = await fetch(`${API}/message`);

      const data = await response.json();

      setMessage(data.text);
      setResult("Message fetched successfully");
    } catch (error) {
      setResult("Error fetching message");
      console.error(error);
    }
  };

  // ======================================================
  // GET ALL STUDENTS
  // ======================================================

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API}/students`);

      const data = await response.json();

      setStudents(data);
      setResult("Students fetched successfully");
    } catch (error) {
      setResult("Error fetching students");
      console.error(error);
    }
  };

  // ======================================================
  // GET STUDENT BY ID
  // ======================================================

  const fetchStudentById = async () => {
    if (!studentId) {
      setResult("Please enter student ID");
      return;
    }

    try {
      const response = await fetch(`${API}/students/${studentId}`);

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message);
        return;
      }

      setStudents([data]);

      setResult("Student fetched successfully");
    } catch (error) {
      setResult("Error fetching student");
      console.error(error);
    }
  };

  // ======================================================
  // POST - ADD STUDENT
  // ======================================================

  const addStudent = async () => {
    if (!name || !branch) {
      setResult("Please enter name and branch");
      return;
    }

    try {
      const response = await fetch(`${API}/students`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          branch: branch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message);
        return;
      }

      setResult(data.message);

      setName("");
      setBranch("");

      fetchStudents();
    } catch (error) {
      setResult("Error adding student");
      console.error(error);
    }
  };

  // ======================================================
  // PUT - UPDATE COMPLETE STUDENT
  // ======================================================

  const updateStudent = async () => {
    if (!studentId || !name || !branch) {
      setResult("Please enter ID, name and branch");
      return;
    }

    try {
      const response = await fetch(`${API}/students/${studentId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          branch: branch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message);
        return;
      }

      setResult(data.message);

      fetchStudents();
    } catch (error) {
      setResult("Error updating student");
      console.error(error);
    }
  };

  // ======================================================
  // PATCH - PARTIAL UPDATE
  // ======================================================

  const patchStudent = async () => {
    if (!studentId) {
      setResult("Please enter student ID");
      return;
    }

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (branch) {
      updateData.branch = branch;
    }

    if (Object.keys(updateData).length === 0) {
      setResult("Enter name or branch to update");
      return;
    }

    try {
      const response = await fetch(`${API}/students/${studentId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message);
        return;
      }

      setResult(data.message);

      fetchStudents();
    } catch (error) {
      setResult("Error partially updating student");
      console.error(error);
    }
  };

  // ======================================================
  // DELETE STUDENT
  // ======================================================

  const deleteStudent = async () => {
    if (!studentId) {
      setResult("Please enter student ID");
      return;
    }

    try {
      const response = await fetch(`${API}/students/${studentId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.message);
        return;
      }

      setResult(data.message);

      setStudentId("");

      fetchStudents();
    } catch (error) {
      setResult("Error deleting student");
      console.error(error);
    }
  };

  // ======================================================
  // FRONTEND
  // ======================================================

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1 style={{ color: "blue" }}>
        Student REST API
      </h1>

      <hr />

      {/* GET MESSAGE */}

      <h2>GET Requests</h2>

      <button onClick={fetchMessage}>
        GET Message
      </button>

      <button
        onClick={fetchStudents}
        style={{ marginLeft: "10px" }}
      >
        GET All Students
      </button>

      <br />
      <br />

      {/* GET BY ID */}

      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button
        onClick={fetchStudentById}
        style={{ marginLeft: "10px" }}
      >
        GET Student
      </button>

      <hr />

      {/* INPUTS */}

      <h2>Student Details</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "8px",
          marginRight: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        style={{
          padding: "8px",
        }}
      />

      <br />
      <br />

      {/* POST */}

      <button onClick={addStudent}>
        POST Add Student
      </button>

      {/* PUT */}

      <button
        onClick={updateStudent}
        style={{ marginLeft: "10px" }}
      >
        PUT Update
      </button>

      {/* PATCH */}

      <button
        onClick={patchStudent}
        style={{ marginLeft: "10px" }}
      >
        PATCH Update
      </button>

      {/* DELETE */}

      <button
        onClick={deleteStudent}
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
        }}
      >
        DELETE
      </button>

      <hr />

      {/* MESSAGE */}

      {message && (
        <h3>
          Backend: {message}
        </h3>
      )}

      {/* RESULT */}

      {result && (
        <p>
          <strong>Result:</strong> {result}
        </p>
      )}

      {/* STUDENTS */}

      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students loaded.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <strong>ID:</strong> {student.id}
              {" | "}
              <strong>Name:</strong> {student.name}
              {" | "}
              <strong>Branch:</strong> {student.branch}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;