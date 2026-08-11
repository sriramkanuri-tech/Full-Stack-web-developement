import React from "react";
import "./styles.css";

// ============================================================
// FLEXBOX DEMO — SignalDash Navigation Menu & Sensor Card
//
// Flexbox arranges items in ONE direction at a time:
//   - flex-direction: row     -> items sit side by side
//   - flex-direction: column  -> items stack vertically
//
// This component shows both directions using two real
// SignalDash pieces: the top navigation bar (row) and a
// single sensor card (column).
// ============================================================

function App() {
  return (
    <div className="page">
      <h1>Flexbox — Live Demo</h1>
      <p className="intro">
        One Flexbox container, one direction. Watch how the same
        set of items behaves differently as a row vs. a column.
      </p>

      {/* ROW EXAMPLE — Navigation menu.
          All four links belong to one horizontal sequence. */}
      <p className="label">Navigation menu — flex-direction: row</p>
      <div className="nav-bar">
        <p className="nav-item">Dashboard</p>
        <p className="nav-item">Reports</p>
        <p className="nav-item">Alerts</p>
        <p className="nav-item">Settings</p>
      </div>

      {/* COLUMN EXAMPLE — Sensor card.
          The three lines belong to one vertical sequence. */}
      <p className="label">Sensor card — flex-direction: column</p>
      <div className="sensor-card">
        <p className="sensor-name">Temperature</p>
        <p className="sensor-value">32.5°C</p>
        <p className="sensor-status">Status: Normal</p>
      </div>

      <p className="footnote">
        Try changing flex-direction, justify-content, or
        align-items in styles.css and re-run to see the effect.
      </p>
    </div>
  );
}

export default App;
