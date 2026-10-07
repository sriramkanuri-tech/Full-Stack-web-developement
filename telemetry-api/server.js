require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/sensors/:id/history", async (req, res) => {
    try {
        const sensorId = req.params.id;
        const hours = parseInt(req.query.hours) || 24;

        if (!sensorId) {
            return res.status(400).json({
                message: "Sensor ID Required"
            });
        }

        if (isNaN(hours) || hours <= 0 || hours > 168) {
            return res.status(400).json({
                message: "Hours must be between 1 and 168"
            });
        }

        const query = `
            SELECT *
            FROM telemetry_logs
            WHERE sensor_id = $1
            AND reading_timestamp >= NOW() - ($2 * INTERVAL '1 hour')
            ORDER BY reading_timestamp DESC
        `;

        const result = await pool.query(query, [sensorId, hours]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "No Data Found"
            });
        }

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running on port 3000");
});