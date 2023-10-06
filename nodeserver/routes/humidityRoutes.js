// routes/temperatureRoutes.js
const express = require("express");
const router = express.Router();

// Function to generate random humidity data
function generateHumidity() {
  const humidity = (Math.random() * (60 - 40) + 40).toFixed(2); // Random humidity between 40 and 60
  return humidity;
}

// Endpoint to fetch humidity data
router.get("/get-humidity", (req, res) => {
  const humidity = generateHumidity();
  res.json({ humidity });
});

module.exports = router;
