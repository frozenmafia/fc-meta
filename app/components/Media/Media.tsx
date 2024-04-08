"use client"
import { Card, CardMedia, Typography } from "@mui/material";
import { title } from "process";
import React, { useEffect } from "react";

const SimpleCard: React.FC<{ img: string, title:string }> = (props) => {
  // ... rest of your code

  // Ensure the image path is correct (absolute, relative, or public folder)
  const imgUrl = props.img; // Assuming the prop is already provided correctly

  useEffect(() => {
    console.log(props);
  }, []);

  return (
      <Card style={{ padding: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={imgUrl}
            title="Pancakes"
            alt="Pancakes"
            style={{ 
              width: "100%", 
              height: "auto", 
              borderRadius: "8px" }} // Optional styling
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
            }}
          >
            <Typography variant="h5" component="div" fontSize={"4rem"}>
              {title}
            </Typography>
          </div>
        </div>
      </Card>

  );
};

export default SimpleCard;
