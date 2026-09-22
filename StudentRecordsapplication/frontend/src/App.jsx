import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);

  const fetchMessage = () => {
    fetch("http://localhost:3000/api/v1/message")
      .then(res => res.json())
      .then(data => setMessage(data.text))
      .catch(err => console.error("Error fetching message:", err));
  };

  const fetchStudents = () => {
    fetch("http://localhost:3000/api/v1/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error fetching students:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ color: "blue" }}>Frontend–Backend Demo</h2>

      <button
        onClick={fetchMessage}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Get Message
      </button>

      <button
        onClick={fetchStudents}
        style={{
          backgroundColor: "orange",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Get Students
      </button>

      <div style={{ marginTop: "20px" }}>
        {message && <p>Backend says: {message}</p>}
        {students.length > 0 && (
          <ul>
            {students.map(s => (
              <li key={s.id}>
                {s.id}. {s.name} — {s.branch}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
