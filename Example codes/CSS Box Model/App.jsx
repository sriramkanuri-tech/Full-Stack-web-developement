import React from "react";
import "./styles.css";

// ============================================================
// CSS BOX MODEL DEMO — SignalDash Temperature Sensor Card
//
// Every HTML element the browser renders is a rectangular box
// made of four layers, from the inside out:
//   1. Content  -> the actual information (text, numbers, etc.)
//   2. Padding  -> space INSIDE the box, around the content
//   3. Border   -> the visible edge of the box
//   4. Margin   -> space OUTSIDE the box, separating it from
//                  its neighbors
//
// This component renders THREE versions of the same card so
// you can see each layer being added one at a time.
// ============================================================

function App() {
  return (
    <div className="page">
      <h1>CSS Box Model — Live Demo</h1>
      <p className="intro">
        Same content, three cards. Watch how padding, border, and
        margin change the box without ever touching the content.
      </p>

      <div className="demo-row">

        {/* STEP 1: Content only — no padding, no border, no margin.
            The text touches the edge of its own box directly. */}
        <div className="card step-content-only">
          <p className="label">1. Content only</p>
          <p className="sensor-name">Temperature</p>
          <p className="sensor-value">32.5°C</p>
        </div>

        {/* STEP 2: Content + Padding + Border.
            Padding pushes the content away from the edge.
            Border draws a visible boundary around that padding. */}
        <div className="card step-padding-border">
          <p className="label">2. + Padding + Border</p>
          <p className="sensor-name">Temperature</p>
          <p className="sensor-value">32.5°C</p>
        </div>

        {/* STEP 3: Content + Padding + Border + Margin.
            Margin adds space OUTSIDE the border, which is why
            this card sits further from its neighbor on the page. */}
        <div className="card step-full-box-model">
          <p className="label">3. + Margin</p>
          <p className="sensor-name">Temperature</p>
          <p className="sensor-value">32.5°C</p>
        </div>

      </div>

      <p className="footnote">
        Try changing the padding, border, and margin values in
        styles.css and re-run — watch each box respond independently.
      </p>
    </div>
  );
}

export default App;
