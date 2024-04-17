import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

function ArtikliRows(props) {
  const [artikli, setArtikli] = useState(null);
  const id = props.id;

  useEffect(() => {
    fetchArtikli();
  }, []);

  const fetchArtikli = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/artikli");
      const jsonData = await response.json();
      setArtikli(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <TableBody>
      {artikli ? (
        artikli.map((item, index) => (
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
        ))
      ) : (
        <></>
      )}
    </TableBody>
  );
}

ArtikliRows.propTypes = { id: PropTypes.number.isRequired };

export default ArtikliRows;

/*
<TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>TODO artikli</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
*/
