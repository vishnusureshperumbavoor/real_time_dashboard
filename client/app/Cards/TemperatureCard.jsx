import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function TemperatureCard() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_FLASK_API_URL}/get-temperature`;

        // Use Axios to fetch temperature data from the Flask backend
        const response = await axios.get(apiUrl);

        // Assuming your Flask API returns temperature data in the "temperature" field
        setTemperature(response.data.temperature);
        console.log(response.data.temperature);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    // Fetch temperature data initially when the component mounts
    fetchData();

    // Set up an interval to fetch temperature data every 2 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Card sx={{ minWidth: 275, backgroundColor: "#212121" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
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
