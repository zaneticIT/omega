import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

function Artikli() {
  const [artikli, setArtikli] = useState(null);

  useEffect(() => {
    fetchArtikli();
  }, []);

  const fetchArtikli = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/artikli");
      const jsonData = await response.json();
      setArtikli(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        API Data
      </Typography>
      {artikli ? (
        <List>
          {artikli.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={JSON.stringify(item)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}

export default Artikli;
