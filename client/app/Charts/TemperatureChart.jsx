"use client";
import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import io from "socket.io-client"

const socket = io.connect("http://localhost:5000/");

function TemperatureChart() {
  const [data,setData] = useState("")

  useEffect(() => {
    socket.on("message",(data)=>{
      alert("connected to server")
    })
  }, [])
  
  // const data = [
  //   { name: "Jan", uv: 20, pv: 30 },
  //   { name: "Feb", uv: 25, pv: 28 },
  //   { name: "Mar", uv: 30, pv: 35 },
  //   { name: "Apr", uv: 28, pv: 32 },
  //   { name: "May", uv: 35, pv: 38 },
  //   { name: "Jun", uv: 38, pv: 40 },
  // ];
  return (
    <div>
      <h1>{data}</h1>
      TemperatureChart
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default TemperatureChart;
