import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function MoistureCard() {
  const [moisture, setMoisture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_FLASK_API_URL}/get-moisture`;

        // Use Axios to fetch moisture data from the Flask backend
        const response = await axios.get(apiUrl);

        // Assuming your Flask API returns moisture data in the "moisture" field
        setMoisture(response.data.moisture);
      } catch (error) {
        console.error("Error fetching moisture data:", error);
      }
    };

    // Fetch moisture data initially when the component mounts
    fetchData();

    // Set up an interval to fetch moisture data every 2 seconds
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
