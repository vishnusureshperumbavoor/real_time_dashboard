"use client";
import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from "recharts";
import { Card,CardContent,Typography } from "@mui/material";
import socketIOClient from "socket.io-client";
require("dotenv").config;

function TemperatureChart() {
  const [chartData,setChartData] = useState("")
  const [data,setData] = useState([])
  const [firstState, setfirstState] = useState([])
  const [secondState, setsecondState] = useState([])
  const [thirdState, setthirdState] = useState([])
  const [fourthState, setfourthState] = useState([])
  const [fifthState, setfifthState] = useState([])
  const [sixthState, setsixthState] = useState([])

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_ENDPOINT);
    socket.on("temperature_chart_data",(data)=>{
      setData(data)
    })
    socket.on("message",(data)=>{
      setChartData(data)
    })
  }, [])

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
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}

export default TemperatureChart;
