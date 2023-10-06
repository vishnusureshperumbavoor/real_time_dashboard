// routes/temperatureRoutes.js
const express = require("express");
const router = express.Router();

// Function to generate random temperature data
function generateTemperature() {
  const temperature = (Math.random() * (30 - 20) + 20).toFixed(2); // Random temperature between 20 and 30
  return temperature;
}

// Endpoint to fetch temperature data
router.get("/get-temperature", (req, res) => {
  const temperature = generateTemperature();
  res.json({ temperature });
});

module.exports = router;
