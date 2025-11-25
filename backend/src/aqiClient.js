// backend/src/aqiClient.js
require("dotenv").config();
const axios = require("axios");

const API_TOKEN = process.env.AQICN_API_TOKEN;
if (!API_TOKEN) {
  console.warn("Warning: AQICN_API_TOKEN is not set in .env");
}

async function fetchCityAqi(cityName) {
  const encodedCity = encodeURIComponent(cityName.trim());
  const url = `https://api.waqi.info/feed/${encodedCity}/?token=${API_TOKEN}`;

  const { data } = await axios.get(url, { timeout: 8000 });

  console.log("AQICN response for", cityName, JSON.stringify(data, null, 2)); // 👈 add this

  if (!data || data.status !== "ok") {
    const message =
      data && data.data ? data.data : "Failed to fetch AQI data for this city.";
    const error = new Error(message);
    error.type = "AQI_API_ERROR";
    throw error;
  }

  const d = data.data;

  return {
    city: d.city?.name || cityName,
    aqi: Number(d.aqi),
    dominantPollutant: d.dominentpol || null,
    time: d.time?.s || null,
    iaqi: d.iaqi || {},
    raw: d,
  };
}

module.exports = {
  fetchCityAqi,
};
