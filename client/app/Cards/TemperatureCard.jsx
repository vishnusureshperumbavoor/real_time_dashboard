import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import socketIOClient from "socket.io-client";
require('dotenv').config

function TemperatureCard() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_ENDPOINT);

    // Listen for temperature updates from the server
    socket.on("temperature", (newTemperature) => {
      setTemperature(newTemperature);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);

  return (
    <div>
      <Card sx={{ minWidth: 275, backgroundColor: "#212121" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14, fontFamily: "Times New Roman" }}
            color="white"
            gutterBottom
          >
            Temperature
          </Typography>
          <Typography variant="h5" component="div" color="white">
            {temperature !== null ? `${temperature} °C` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default TemperatureCard;
