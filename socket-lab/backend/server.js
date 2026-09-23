const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

let latestTemperature = null;

io.on("connection", (socket) => {
    console.log("Client Connected");

    socket.on("join-room", (roomName) => {
        socket.join(roomName);

        console.log(`${socket.id} joined ${roomName}`);
    });
});

// Simulated sensor data every 10 ms
setInterval(() => {
    latestTemperature = {
        value: (20 + Math.random() * 10).toFixed(2),
            time: new Date(),
    };
}, 10);

// Broadcast every 500 ms
setInterval(() => {
    if (latestTemperature !== null) {
        io.to("temperature-feed").emit(
            "temperature-update",
            latestTemperature
        );
    }
}, 500);

server.listen(3000, () => {
    console.log("Server Running On Port 3000");
});
