import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  "http://localhost:3000"
);

function App() {

  const [temperature,
  setTemperature]
  = useState(null);

  useEffect(() => {

    socket.emit(
      "join-room",
      "temperature-feed"
    );

    socket.on(
      "temperature-update",
      (data) => {

        setTemperature(data);

      }
    );

    return () => {

      socket.off(
        "temperature-update"
      );

    };

  }, []);

  return (

    <div
    style={{
      padding: "20px",
      fontFamily: "Arial"
    }}
    >

    <h2>
    Telemetry Dashboard
    </h2>

    <h3>
    Temperature Feed
    </h3>

    {

      temperature && (

        <div>

        <p>

        Temperature :
        {temperature.value} Â°C

        </p>

        <p>

        Time :
        {
          new Date(
            temperature.time
          )
          .toLocaleTimeString()
        }

        </p>

        </div>

      )

    }

    </div>

  );

}

export default App;
