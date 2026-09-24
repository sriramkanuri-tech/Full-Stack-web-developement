const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// =====================================================
// SENSOR DATA
// =====================================================

let sensors = {
    temperature: [
        { room: 1, value: 25.20 },
        { room: 2, value: 26.40 },
        { room: 3, value: 24.80 }
    ],

    humidity: [
        { room: 1, value: 55.20 },
        { room: 2, value: 61.40 },
        { room: 3, value: 48.80 }
    ],

    pressure: [
        { room: 1, value: 1001.20 },
        { room: 2, value: 1005.40 },
        { room: 3, value: 997.80 }
    ]
};

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
    res.send("Sensor Server Running");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

// =====================================================
// SOCKET CONNECTION
// =====================================================

io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    // -------------------------------
    // TEMPERATURE
    // -------------------------------

    socket.on("join-temperature", () => {

        console.log(socket.id, "joined temperature");

        socket.join("temperature-feed");

        socket.emit(
            "temperature-data",
            sensors.temperature
        );
    });

    // -------------------------------
    // HUMIDITY
    // -------------------------------

    socket.on("join-humidity", () => {

        console.log(socket.id, "joined humidity");

        socket.join("humidity-feed");

        socket.emit(
            "humidity-data",
            sensors.humidity
        );
    });

    // -------------------------------
    // PRESSURE
    // -------------------------------

    socket.on("join-pressure", () => {

        console.log(socket.id, "joined pressure");

        socket.join("pressure-feed");

        socket.emit(
            "pressure-data",
            sensors.pressure
        );
    });

    // -------------------------------
    // DISCONNECT
    // -------------------------------

    socket.on("disconnect", () => {

        console.log(
            "Client disconnected:",
            socket.id
        );

    });

});

// =====================================================
// SENSOR SIMULATION
// =====================================================

setInterval(() => {

    sensors.temperature = [
        {
            room: 1,
            value: Number(
                (20 + Math.random() * 10).toFixed(2)
            )
        },
        {
            room: 2,
            value: Number(
                (20 + Math.random() * 10).toFixed(2)
            )
        },
        {
            room: 3,
            value: Number(
                (20 + Math.random() * 10).toFixed(2)
            )
        }
    ];

    sensors.humidity = [
        {
            room: 1,
            value: Number(
                (40 + Math.random() * 30).toFixed(2)
            )
        },
        {
            room: 2,
            value: Number(
                (40 + Math.random() * 30).toFixed(2)
            )
        },
        {
            room: 3,
            value: Number(
                (40 + Math.random() * 30).toFixed(2)
            )
        }
    ];

    sensors.pressure = [
        {
            room: 1,
            value: Number(
                (990 + Math.random() * 20).toFixed(2)
            )
        },
        {
            room: 2,
            value: Number(
                (990 + Math.random() * 20).toFixed(2)
            )
        },
        {
            room: 3,
            value: Number(
                (990 + Math.random() * 20).toFixed(2)
            )
        }
    ];

}, 500);

// =====================================================
// BROADCAST
// =====================================================

setInterval(() => {

    io.to("temperature-feed").emit(
        "temperature-data",
        sensors.temperature
    );

    io.to("humidity-feed").emit(
        "humidity-data",
        sensors.humidity
    );

    io.to("pressure-feed").emit(
        "pressure-data",
        sensors.pressure
    );

}, 1000);

// =====================================================
// SERVER
// =====================================================

const PORT = 3000;

server.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log(" SENSOR SERVER RUNNING");
    console.log("================================");
    console.log(
        `Server: http://localhost:${PORT}`
    );
    console.log(
        `Health: http://localhost:${PORT}/api/health`
    );
    console.log("================================");
});