const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:3000" }));

// functions to generate temperature, humidity and moisture data
function generateTemperature() {
  const temperature = (Math.random() * (30 - 20) + 20).toFixed(2); // Random temperature between 20 and 30
  return temperature;
}

function generateHumidity() {
  const humidity = (Math.random() * (60 - 40) + 40).toFixed(2); // Random humidity between 40 and 60
  return humidity;
}

function generateMoisture() {
  const moisture = (Math.random() * (30 - 20) + 20).toFixed(2); // Random moisture between 20 and 30
  return moisture;
}

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  const dataInterval = setInterval(() => {

    const temperature = generateTemperature();
    const humidity = generateHumidity();
    const moisture = generateMoisture();

    const currentTime = new Date().toLocaleTimeString();

    socket.emit("temperature", {temperature,time:currentTime});
    socket.emit("humidity", { humidity, time: currentTime });
    socket.emit("moisture", { moisture, time: currentTime });
  }, 1000);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    clearInterval(dataInterval);
  });
});

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
