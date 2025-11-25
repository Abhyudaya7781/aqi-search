// backend/src/server.js
require("dotenv").config();
console.log("Using AQICN token:", process.env.AQICN_API_TOKEN ? "SET" : "MISSING");
const express = require("express");
const cors = require("cors");
const aqiRoute = require("./routes/aqiRoute");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AQI Search API is running" });
});

app.use("/api/aqi", aqiRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
