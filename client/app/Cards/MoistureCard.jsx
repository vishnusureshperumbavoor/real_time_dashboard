import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import socketIOClient from "socket.io-client";
require("dotenv").config;

function MoistureCard() {
  const [moisture, setMoisture] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_ENDPOINT);

    // Listen for moisture updates from the server
    socket.on("moisture", (newMoisture) => {
      setMoisture(newMoisture);
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
            Moisture
          </Typography>
          <Typography variant="h5" component="div" color="white">
            {moisture !== null ? `${moisture}%` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default MoistureCard;
