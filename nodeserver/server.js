const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let timeChange;

// Function to generate random temperature data
function generateTemperature() {
  const temperature = (Math.random() * (30 - 20) + 20).toFixed(2); // Random temperature between 20 and 30
  return temperature;
}

// Endpoint to fetch temperature data
app.get("/get-temperature", (req, res) => {
  const temperature = generateTemperature();
  res.json({ temperature });
});

// Function to generate random moisture data
function generateMoisture() {
  const moisture = (Math.random() * (30 - 20) + 20).toFixed(2); // Random moisture between 20 and 30
  return moisture;
}

// Endpoint to fetch moisture data
app.get("/get-moisture", (req, res) => {
  const moisture = generateMoisture();
  res.json({ moisture });
});

// Function to generate random humidity data
function generateHumidity() {
  const humidity = (Math.random() * (60 - 40) + 40).toFixed(2); // Random humidity between 40 and 60
  return humidity;
}

// Endpoint to fetch humidity data
app.get("/get-humidity", (req, res) => {
  const humidity = generateHumidity();
  res.json({ humidity });
});



io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  if (timeChange) {
    setInterval(() => {
      socket.emit("message", new Date(), 1000);
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
