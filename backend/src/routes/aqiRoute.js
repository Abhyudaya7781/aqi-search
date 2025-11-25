// backend/src/routes/aqiRoute.js
const express = require("express");
const router = express.Router();
const { fetchCityAqi } = require("../aqiClient");
const SimpleCache = require("../cache");

const ttlMs = Number(process.env.CACHE_TTL_MS || 300000);
const maxEntries = Number(process.env.CACHE_MAX_ENTRIES || 100);
const cache = new SimpleCache(ttlMs, maxEntries);

router.get("/", async (req, res) => {
  const city = (req.query.city || "").trim();

  if (!city) {
    return res.status(400).json({
      error: "Query parameter 'city' is required, e.g. /api/aqi?city=Delhi",
    });
  }

  const key = city.toLowerCase();

  // 1. Try cache
  const cached = cache.get(key);
  if (cached) {
    return res.json({
      source: "cache",
      ...cached,
    });
  }

  try {
    // 2. Fetch from vendor
    const result = await fetchCityAqi(city);

    // 3. Store in cache
    cache.set(key, result);

    res.json({
      source: "live",
      ...result,
    });
  } catch (err) {
    console.error("Error fetching AQI:", err.message);

    if (err.type === "AQI_API_ERROR") {
      return res.status(502).json({
        error: "Upstream AQI API error",
        details: err.message,
      });
    }

    res.status(500).json({
      error: "Unexpected error while fetching air quality data",
    });
  }
});

module.exports = router;
