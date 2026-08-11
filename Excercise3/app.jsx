import "./styles.css";

function App() {
  return (
    <div className="container">

      {/* Question 1 */}
      <h2>Question 1 - Signal Metrics Dashboard</h2>

      <div className="metrics-grid">

        <div className="metric-card">
          <div className="metric-header">
            <span className="parameter-title">Current Frequency</span>
            <span className="status-light"></span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="parameter-title">Voltage</span>
            <span className="status-light"></span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="parameter-title">Pressure</span>
            <span className="status-light"></span>
          </div>
        </div>

      </div>


      {/* Question 2 */}

      <h2>Question 2 - Telemetry Alert Feed</h2>

      <div className="alert-grid">

        <div className="alert-card">

          <div className="badge critical">
            CRITICAL
          </div>

          <div className="alert-info">
            <div className="sensor-name">Temperature Sensor</div>
            <div className="time">10:30 AM</div>
          </div>

          <button className="alert-btn">
            Acknowledge Alert
          </button>

        </div>


        <div className="alert-card">

          <div className="badge warning">
            WARNING
          </div>

          <div className="alert-info">
            <div className="sensor-name">Pressure Sensor</div>
            <div className="time">10:45 AM</div>
          </div>

          <button className="alert-btn">
            Acknowledge Alert
          </button>

        </div>

      </div>


      {/* Question 3 */}

      <h2>Question 3 - Sensor Telemetry Matrix</h2>

      <div className="sensor-grid">

        <div className="sensor-card">

          <div className="parameter">
            Temperature
          </div>

          <div className="value-row">
            <span className="live-value">32</span>
            <span className="unit">°C</span>
          </div>

        </div>


        <div className="sensor-card">

          <div className="parameter">
            Pressure
          </div>

          <div className="value-row">
            <span className="live-value">120</span>
            <span className="unit">kPa</span>
          </div>

        </div>


        <div className="sensor-card">

          <div className="parameter">
            Voltage
          </div>

          <div className="value-row">
            <span className="live-value">220</span>
            <span className="unit">V</span>
          </div>

        </div>


        <div className="sensor-card">

          <div className="parameter">
            Frequency
          </div>

          <div className="value-row">
            <span className="live-value">50</span>
            <span className="unit">Hz</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;