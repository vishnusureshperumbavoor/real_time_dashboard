"use client"
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function realtimelinechart() {
    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: "Real-Time Data",
          data: [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
    useEffect(() => {
      socket.on("data", (newData) => {
        // Assuming newData is an object with a timestamp and value property
        setData((prevData) => ({
          labels: [...prevData.labels, newData.timestamp],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, newData.value],
            },
          ],
        }));
      });
      return () => {
        socket.off("data");
      };
    }, []);

  return (
    <div>
      <div>
        <h1>Real-Time Line Chart</h1>
        <Line data={data} />
      </div>
    </div>
  );
}

export default realtimelinechart