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

  // Send random temperature, humidity, and moisture data to the client every second
  const dataInterval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 201) + 200;
    const randomNumber1 = Math.floor(Math.random() * 201) + 200;
    const randomNumber2 = Math.floor(Math.random() * 201) + 200;
    const randomNumber3 = Math.floor(Math.random() * 201) + 200;
    const randomNumber4 = Math.floor(Math.random() * 201) + 200;
    const randomNumber5 = Math.floor(Math.random() * 201) + 200;

    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata", // Set the time zone to IST
      hour12: true, // Use 24-hour format
    };
    const indianTime = date.toLocaleTimeString("en-US", options);

    function subtractSeconds(date, seconds) {
      console.log(date);
      date.setSeconds(date.getSeconds() - seconds);
      return date;
    }

    const subtractOneSeconds = subtractSeconds(date, 1);
    const subtractTwoSeconds = subtractSeconds(date, 2);
    const subtractThreeSeconds = subtractSeconds(date, 3);
    const subtractFourSeconds = subtractSeconds(date, 4);
    const subtractFiveSeconds = subtractSeconds(date, 5);

    const data = [
      { date: subtractFiveSeconds, temperature: randomNumber },
      { date: subtractFourSeconds, temperature: randomNumber1 },
      { date: subtractThreeSeconds, temperature: randomNumber2 },
      { date: subtractTwoSeconds, temperature: randomNumber3 },
      { date: subtractOneSeconds, temperature: randomNumber4 },
      { date: indianTime, temperature: randomNumber5 },
    ];

    const temperature = generateTemperature();
    const humidity = generateHumidity();
    const moisture = generateMoisture();

    socket.emit("temperature", temperature);
    socket.emit("humidity", humidity);
    socket.emit("moisture", moisture);
    socket.emit("message", indianTime);
    socket.emit("temperature_chart_data", data);
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
