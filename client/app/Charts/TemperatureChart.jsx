"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import socketIOClient from "socket.io-client";
require("dotenv").config;

function TemperatureChart() {
  const [data, setData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.NEXT_PUBLIC_ENDPOINT);
    socketRef.current.on("temperature", (response) => {
      console.log(response);
      setData((prevData) => [
        ...prevData,
        {
          time: response.time,
          temperature: response.temperature,
        },
      ]);
    });
    const maxDataPoints = 60;
    if (data.length > maxDataPoints) {
      setData((prevData) => prevData.slice(-maxDataPoints));
    }
    return () => {
      socketRef.current.disconnect();
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
            TemperatureChart
          </Typography>
          <LineChart
            width={750}
            height={370}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}

export default TemperatureChart;
