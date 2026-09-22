import React, { useState } from "react";
import "./App.css";

const API = "http://localhost:3000/api/v1";

function App() {
  const [page, setPage] = useState("GET");

  const [students, setStudents] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  // =====================================================
  // CLEAR FORM
  // =====================================================

  const clearForm = () => {
    setId("");
    setName("");
    setBranch("");
    setResponse("");
    setStatus("");
  };

  // =====================================================
  // CHANGE PAGE
  // =====================================================

  const changePage = (newPage) => {
    setPage(newPage);
    clearForm();
    setStudents([]);
  };

  // =====================================================
  // GET ALL STUDENTS
  // =====================================================

  const getAllStudents = async () => {
    try {
      const res = await fetch(`${API}/students`);

      const data = await res.json();

      setStudents(data);

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus("ERROR");

      setResponse(error.message);
    }
  };

  // =====================================================
  // GET STUDENT BY ID
  // =====================================================

  const getStudent = async () => {
    if (!id) {
      setStatus("ERROR");
      setResponse("Please enter Student ID");
      return;
    }

    try {
      const res = await fetch(`${API}/students/${id}`);

      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));

      if (res.ok) {
        setStudents([data]);
      } else {
        setStudents([]);
      }
    } catch (error) {
      setStatus("ERROR");
      setResponse(error.message);
    }
  };

  // =====================================================
  // POST - ADD STUDENT
  // =====================================================

  const addStudent = async () => {
    if (!name || !branch) {
      setStatus("ERROR");
      setResponse("Name and Branch are required");
      return;
    }

    try {
      const res = await fetch(`${API}/students`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          branch,
        }),
      });

      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));

      if (res.ok) {
        setName("");
        setBranch("");
      }
    } catch (error) {
      setStatus("ERROR");
      setResponse(error.message);
    }
  };

  // =====================================================
  // PUT - COMPLETE UPDATE
  // =====================================================

  const putStudent = async () => {
    if (!id || !name || !branch) {
      setStatus("ERROR");
      setResponse(
        "Student ID, Name and Branch are required"
      );
      return;
    }

    try {
      const res = await fetch(
        `${API}/students/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            branch,
          }),
        }
      );

      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus("ERROR");
      setResponse(error.message);
    }
  };

  // =====================================================
  // PATCH - PARTIAL UPDATE
  // =====================================================

  const patchStudent = async () => {
    if (!id) {
      setStatus("ERROR");
      setResponse("Student ID is required");
      return;
    }

    if (!name && !branch) {
      setStatus("ERROR");
      setResponse(
        "Enter Name or Branch to update"
      );
      return;
    }

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (branch) {
      updateData.branch = branch;
    }

    try {
      const res = await fetch(
        `${API}/students/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updateData),
        }
      );

      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus("ERROR");
      setResponse(error.message);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const deleteStudent = async () => {
    if (!id) {
      setStatus("ERROR");
      setResponse("Please enter Student ID");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete student with ID ${id}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(
        `${API}/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      setStatus(`${res.status} ${res.statusText}`);

      setResponse(JSON.stringify(data, null, 2));

      if (res.ok) {
        setId("");
      }
    } catch (error) {
      setStatus("ERROR");
      setResponse(error.message);
    }
  };

  // =====================================================
  // GET PAGE
  // =====================================================

  const renderGetPage = () => {
    return (
      <>
        <PageHeader
          method="GET"
          title="Get Student Records"
          description="Retrieve student records from the database."
        />

        <div className="method-card">

          <div className="method-card-title">
            <span className="method-badge get">
              GET
            </span>

            <span>
              Get All Students
            </span>
          </div>

          <p className="help-text">
            Retrieve all student records.
          </p>

          <button
            className="primary-button"
            onClick={getAllStudents}
          >
            Get All Students
          </button>

        </div>

        <div className="method-card">

          <div className="method-card-title">
            <span className="method-badge get">
              GET
            </span>

            <span>
              Get Student By ID
            </span>
          </div>

          <div className="form-group">

            <label>
              Student ID
            </label>

            <input
              type="number"
              placeholder="Enter student ID"
              value={id}
              onChange={(e) =>
                setId(e.target.value)
              }
            />

          </div>

          <button
            className="primary-button"
            onClick={getStudent}
          >
            Get Student
          </button>

        </div>

        <StudentTable />
      </>
    );
  };

  // =====================================================
  // POST PAGE
  // =====================================================

  const renderPostPage = () => {
    return (
      <>
        <PageHeader
          method="POST"
          title="Add Student"
          description="Create a new student record."
        />

        <div className="method-card">

          <div className="method-card-title">
            <span className="method-badge post">
              POST
            </span>

            <span>
              Create New Student
            </span>
          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Branch
              </label>

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
              >
                <option value="">
                  Select branch
                </option>

                <option value="ECE">
                  ECE
                </option>

                <option value="CSE">
                  CSE
                </option>

                <option value="AIML">
                  AIML
                </option>

                <option value="EEE">
                  EEE
                </option>

                <option value="MECH">
                  MECH
                </option>

                <option value="CIVIL">
                  CIVIL
                </option>
              </select>

            </div>

          </div>

          <button
            className="primary-button"
            onClick={addStudent}
          >
            Add Student
          </button>

        </div>

        <Response />
      </>
    );
  };

  // =====================================================
  // PUT PAGE
  // =====================================================

  const renderPutPage = () => {
    return (
      <>
        <PageHeader
          method="PUT"
          title="Update Student"
          description="Completely update an existing student record."
        />

        <div className="method-card">

          <div className="method-card-title">

            <span className="method-badge put">
              PUT
            </span>

            <span>
              Complete Student Update
            </span>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Student ID
              </label>

              <input
                type="number"
                placeholder="Enter student ID"
                value={id}
                onChange={(e) =>
                  setId(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter new name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Branch
              </label>

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
              >
                <option value="">
                  Select branch
                </option>

                <option value="ECE">
                  ECE
                </option>

                <option value="CSE">
                  CSE
                </option>

                <option value="AIML">
                  AIML
                </option>

                <option value="EEE">
                  EEE
                </option>

                <option value="MECH">
                  MECH
                </option>

                <option value="CIVIL">
                  CIVIL
                </option>
              </select>

            </div>

          </div>

          <div className="info-box">
            PUT requires the complete student
            information: ID, Name and Branch.
          </div>

          <button
            className="primary-button"
            onClick={putStudent}
          >
            Update Student
          </button>

        </div>

        <Response />
      </>
    );
  };

  // =====================================================
  // PATCH PAGE
  // =====================================================

  const renderPatchPage = () => {
    return (
      <>
        <PageHeader
          method="PATCH"
          title="Partial Update"
          description="Update one or more fields of an existing student."
        />

        <div className="method-card">

          <div className="method-card-title">

            <span className="method-badge patch">
              PATCH
            </span>

            <span>
              Partial Student Update
            </span>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Student ID
              </label>

              <input
                type="number"
                placeholder="Enter student ID"
                value={id}
                onChange={(e) =>
                  setId(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                New Name
              </label>

              <input
                type="text"
                placeholder="Leave empty to keep current"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                New Branch
              </label>

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
              >
                <option value="">
                  Keep current branch
                </option>

                <option value="ECE">
                  ECE
                </option>

                <option value="CSE">
                  CSE
                </option>

                <option value="AIML">
                  AIML
                </option>

                <option value="EEE">
                  EEE
                </option>

                <option value="MECH">
                  MECH
                </option>

                <option value="CIVIL">
                  CIVIL
                </option>
              </select>

            </div>

          </div>

          <div className="info-box">
            PATCH lets you change only the fields
            you provide. Leave a field empty to
            keep its existing value.
          </div>

          <button
            className="primary-button"
            onClick={patchStudent}
          >
            Partially Update Student
          </button>

        </div>

        <Response />
      </>
    );
  };

  // =====================================================
  // DELETE PAGE
  // =====================================================

  const renderDeletePage = () => {
    return (
      <>
        <PageHeader
          method="DELETE"
          title="Delete Student"
          description="Remove a student record from the system."
        />

        <div className="method-card delete-card">

          <div className="method-card-title">

            <span className="method-badge delete">
              DELETE
            </span>

            <span>
              Delete Student Record
            </span>

          </div>

          <div className="warning-box">

            <strong>
              ⚠ Warning
            </strong>

            <p>
              Deleting a student permanently removes
              the record from the current server data.
            </p>

          </div>

          <div className="form-group">

            <label>
              Student ID
            </label>

            <input
              type="number"
              placeholder="Enter student ID to delete"
              value={id}
              onChange={(e) =>
                setId(e.target.value)
              }
            />

          </div>

          <button
            className="delete-button"
            onClick={deleteStudent}
          >
            Delete Student
          </button>

        </div>

        <Response />
      </>
    );
  };

  // =====================================================
  // RESPONSE COMPONENT
  // =====================================================

  function Response() {
    if (!response) {
      return null;
    }

    return (
      <div className="response-card">

        <div className="response-header">

          <div>
            <h3>
              Response
            </h3>

            <span>
              Server response
            </span>
          </div>

          <span
            className={
              status.startsWith("2")
                ? "status success"
                : "status error"
            }
          >
            {status}
          </span>

        </div>

        <pre>
          {response}
        </pre>

      </div>
    );
  }

  // =====================================================
  // STUDENT TABLE
  // =====================================================

  function StudentTable() {
    if (students.length === 0) {
      return null;
    }

    return (
      <div className="table-card">

        <div className="table-header">

          <div>
            <h3>
              Student Records
            </h3>

            <span>
              {students.length} record(s)
            </span>
          </div>

        </div>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Branch</th>
            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td>
                  #{student.id}
                </td>

                <td>
                  {student.name}
                </td>

                <td>
                  <span className="branch">
                    {student.branch}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            🎓
          </div>

          <div>
            <h2>
              Student API
            </h2>

            <span>
              Record Management
            </span>
          </div>

        </div>

        <div className="menu-title">
          HTTP METHODS
        </div>

        <button
          className={`menu-item ${
            page === "GET" ? "active" : ""
          }`}
          onClick={() =>
            changePage("GET")
          }
        >
          <span className="side-method get">
            GET
          </span>

          <span>
            Get Records
          </span>
        </button>

        <button
          className={`menu-item ${
            page === "POST" ? "active" : ""
          }`}
          onClick={() =>
            changePage("POST")
          }
        >
          <span className="side-method post">
            POST
          </span>

          <span>
            Add Student
          </span>
        </button>

        <button
          className={`menu-item ${
            page === "PUT" ? "active" : ""
          }`}
          onClick={() =>
            changePage("PUT")
          }
        >
          <span className="side-method put">
            PUT
          </span>

          <span>
            Update Student
          </span>
        </button>

        <button
          className={`menu-item ${
            page === "PATCH" ? "active" : ""
          }`}
          onClick={() =>
            changePage("PATCH")
          }
        >
          <span className="side-method patch">
            PATCH
          </span>

          <span>
            Partial Update
          </span>
        </button>

        <button
          className={`menu-item ${
            page === "DELETE" ? "active" : ""
          }`}
          onClick={() =>
            changePage("DELETE")
          }
        >
          <span className="side-method delete">
            DELETE
          </span>

          <span>
            Delete Student
          </span>
        </button>

        <div className="sidebar-footer">

          <div>
            <span className="online"></span>
            API Server Online
          </div>

          <small>
            localhost:3000
          </small>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {page === "GET" &&
          renderGetPage()}

        {page === "POST" &&
          renderPostPage()}

        {page === "PUT" &&
          renderPutPage()}

        {page === "PATCH" &&
          renderPatchPage()}

        {page === "DELETE" &&
          renderDeletePage()}

      </main>

    </div>
  );
}


// =====================================================
// PAGE HEADER COMPONENT
// =====================================================

function PageHeader({
  method,
  title,
  description,
}) {
  return (
    <div className="page-header">

      <div>

        <div className="breadcrumb">
          Student API / {method}
        </div>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

      <span
        className={`large-method ${method.toLowerCase()}`}
      >
        {method}
      </span>

    </div>
  );
}

export default App;