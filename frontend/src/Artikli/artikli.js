import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
      <Paper
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: artikli ? "" : "25vh",
        }}
      >
        {artikli ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Naziv</TableCell>
                  <TableCell align="right">Dobavljač</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artikli.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor:
                        item.status === "KREIRANO"
                          ? "#66bb6a"
                          : item.status === "NARUČENO"
                          ? "#ffa726"
                          : item.status === "ISPORUČENO"
                          ? "grey"
                          : "",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {item.naziv}
                    </TableCell>
                    <TableCell align="right">{item.dobavljac}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span>
            <CircularProgress />
          </span>
        )}
      </Paper>
    </Container>
  );
}

export default Artikli;
