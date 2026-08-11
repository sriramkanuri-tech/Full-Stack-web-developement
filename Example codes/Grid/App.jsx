import React from "react";
import "./styles.css";

// ============================================================
// CSS GRID DEMO — SignalDash Dashboard
//
// CSS Grid arranges items in TWO directions at once:
// rows AND columns together — unlike Flexbox, which only
// handles one direction at a time.
//
// This component lays out six SignalDash sensor cards into
// a 2-column, 3-row grid, just like the real dashboard.
// ============================================================

function App() {
  return (
    <div className="page">
      <h1>CSS Grid — Live Demo</h1>
      <p className="intro">
        One grid container, two dimensions. Six cards, arranged
        into rows and columns at the same time.
      </p>

      <p className="label">
        SignalDash dashboard — display: grid, 2 columns
      </p>

      {/* GRID CONTAINER — display: grid turns this div into
          a grid, and grid-template-columns decides how many
          columns it has and how wide each one is. */}
      <div className="dashboard-grid">
        <div className="grid-card">Temperature</div>
        <div className="grid-card">Pressure</div>
        <div className="grid-card">Humidity</div>
        <div className="grid-card">Voltage</div>
        <div className="grid-card">Frequency</div>
        <div className="grid-card">Power</div>
      </div>

      <p className="footnote">
        Try changing grid-template-columns or gap in styles.css
        and re-run to see the grid reflow.
      </p>
    </div>
  );
}

export default App;
