import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Ugovori() {
  const [ugovori, setUgovori] = useState(null);

  useEffect(() => {
    fetchUgovori();
  }, []);

  const fetchUgovori = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/ugovori");
      const jsonData = await response.json();
      setUgovori(jsonData);
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
          height: ugovori ? "" : "25vh",
        }}
      >
        {ugovori ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Kupac</TableCell>
                  <TableCell align="right">Broj ugovora</TableCell>
                  <TableCell align="right">Datum akonotacije</TableCell>
                  <TableCell align="right">Rok isporuke</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ugovori.map((item, index) => (
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
                      {item.kupac}
                    </TableCell>
                    <TableCell align="right">{item.broj_ugovora}</TableCell>
                    <TableCell align="right">
                      {item.datum_akonotacije}
                    </TableCell>
                    <TableCell align="right">{item.rok_isporuke}</TableCell>
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

export default Ugovori;
