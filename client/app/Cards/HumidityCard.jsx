import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function HumidityCard() {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_FLASK_API_URL}/get-humidity`;

        // Use Axios to fetch humidity data from the Flask backend
        const response = await axios.get(apiUrl);

        // Assuming your Flask API returns humidity data in the "humidity" field
        setHumidity(response.data.humidity);
      } catch (error) {
        console.error("Error fetching humidity data:", error);
      }
    };

    // Fetch humidity data initially when the component mounts
    fetchData();

    // Set up an interval to fetch humidity data every 2 seconds
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
            Humidity
          </Typography>
          <Typography variant="h5" component="div" color="white">
            {humidity !== null ? `${humidity}%` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default HumidityCard;
