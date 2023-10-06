// routes/temperatureRoutes.js
const express = require("express");
const router = express.Router();

// Function to generate random moisture data
function generateMoisture() {
  const moisture = (Math.random() * (30 - 20) + 20).toFixed(2); // Random moisture between 20 and 30
  return moisture;
}

// Endpoint to fetch moisture data
router.get("/get-moisture", (req, res) => {
  const moisture = generateMoisture();
  res.json({ moisture });
});


module.exports = router;
