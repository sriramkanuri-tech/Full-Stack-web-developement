import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

function App() {

  const [activeSensor, setActiveSensor] =
    useState("temperature");

  const [connected, setConnected] =
    useState(false);

  const [temperature, setTemperature] =
    useState([
      { room: 1, value: 25.20 },
      { room: 2, value: 26.40 },
      { room: 3, value: 24.80 }
    ]);

  const [humidity, setHumidity] =
    useState([
      { room: 1, value: 55.20 },
      { room: 2, value: 61.40 },
      { room: 3, value: 48.80 }
    ]);

  const [pressure, setPressure] =
    useState([
      { room: 1, value: 1001.20 },
      { room: 2, value: 1005.40 },
      { room: 3, value: 997.80 }
    ]);

  // =====================================================
  // SOCKET CONNECTION
  // =====================================================

  useEffect(() => {

    socket.on("connect", () => {

      console.log(
        "Connected to server:",
        socket.id
      );

      setConnected(true);

      // Join default temperature room
      socket.emit("join-temperature");

    });

    socket.on("disconnect", () => {

      console.log("Disconnected");

      setConnected(false);

    });

    // =================================================
    // RECEIVE TEMPERATURE
    // =================================================

    socket.on(
      "temperature-data",
      (data) => {

        console.log(
          "Temperature received:",
          data
        );

        setTemperature(data);

      }
    );

    // =================================================
    // RECEIVE HUMIDITY
    // =================================================

    socket.on(
      "humidity-data",
      (data) => {

        console.log(
          "Humidity received:",
          data
        );

        setHumidity(data);

      }
    );

    // =================================================
    // RECEIVE PRESSURE
    // =================================================

    socket.on(
      "pressure-data",
      (data) => {

        console.log(
          "Pressure received:",
          data
        );

        setPressure(data);

      }
    );

    return () => {

      socket.off("connect");
      socket.off("disconnect");

      socket.off("temperature-data");
      socket.off("humidity-data");
      socket.off("pressure-data");

    };

  }, []);

  // =====================================================
  // TEMPERATURE BUTTON
  // =====================================================

  const handleTemperature = () => {

    console.log("Temperature button clicked");

    setActiveSensor("temperature");

    socket.emit("join-temperature");

  };

  // =====================================================
  // HUMIDITY BUTTON
  // =====================================================

  const handleHumidity = () => {

    console.log("Humidity button clicked");

    setActiveSensor("humidity");

    socket.emit("join-humidity");

  };

  // =====================================================
  // PRESSURE BUTTON
  // =====================================================

  const handlePressure = () => {

    console.log("Pressure button clicked");

    setActiveSensor("pressure");

    socket.emit("join-pressure");

  };

  // =====================================================
  // GET ACTIVE DATA
  // =====================================================

  let data = [];
  let title = "";
  let unit = "";
  let icon = "";

  if (activeSensor === "temperature") {

    data = temperature;
    title = "Temperature";
    unit = "°C";
    icon = "🌡️";

  } else if (activeSensor === "humidity") {

    data = humidity;
    title = "Humidity";
    unit = "%";
    icon = "💧";

  } else if (activeSensor === "pressure") {

    data = pressure;
    title = "Pressure";
    unit = "hPa";
    icon = "🌬️";

  }

  return (

    <div className="app">

      {/* =================================================
                HEADER
            ================================================= */}

      <header className="header">

        <div>

          <h1>
            Environmental Monitoring Dashboard
          </h1>

          <p>
            Real-Time Sensor Monitoring
          </p>

        </div>

        <div
          className={
            connected
              ? "connection connected"
              : "connection disconnected"
          }
        >

          <span className="status-dot"></span>

          {connected
            ? "Server Connected"
            : "Server Disconnected"}

        </div>

      </header>


      {/* =================================================
                BUTTONS
            ================================================= */}

      <section className="controls">

        <h2>
          Select Sensor
        </h2>

        <div className="button-container">

          <button
            onClick={handleTemperature}
            className={
              activeSensor === "temperature"
                ? "sensor-button active"
                : "sensor-button"
            }
          >

            <span>
              🌡️
            </span>

            Join Temperature

          </button>


          <button
            onClick={handleHumidity}
            className={
              activeSensor === "humidity"
                ? "sensor-button active"
                : "sensor-button"
            }
          >

            <span>
              💧
            </span>

            Join Humidity

          </button>


          <button
            onClick={handlePressure}
            className={
              activeSensor === "pressure"
                ? "sensor-button active"
                : "sensor-button"
            }
          >

            <span>
              🌬️
            </span>

            Join Pressure

          </button>

        </div>

      </section>


      {/* =================================================
                DASHBOARD
            ================================================= */}

      <main className="dashboard">

        <div className="dashboard-header">

          <div>

            <h2>
              {icon} {title} Dashboard
            </h2>

            <p>
              Live readings from 3 rooms
            </p>

          </div>

          <div className="room-count">

            3 Rooms

          </div>

        </div>


        {/* =================================================
                    THREE ROOMS
                ================================================= */}

        <div className="rooms">

          {data.map((sensor) => (

            <div
              className="room-card"
              key={sensor.room}
            >

              <div className="room-top">

                <span className="room-label">
                  ROOM {sensor.room}
                </span>

                <span className="live">
                  ● LIVE
                </span>

              </div>


              <div className="room-icon">

                {icon}

              </div>


              <h3>
                {title}
              </h3>


              <div className="value">

                {sensor.value}

                <span>
                  {" "}{unit}
                </span>

              </div>


              <div className="room-status">

                Sensor Active

              </div>

            </div>

          ))}

        </div>

      </main>


      {/* =================================================
                FOOTER
            ================================================= */}

      <footer>

        Socket.IO Real-Time Sensor System

      </footer>

    </div>

  );

}

export default App;