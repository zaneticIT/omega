import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  Box,
  Table,
  TableHead,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";

function ArtikliRows(props) {
  const [artikli, setArtikli] = useState(null);
  const id = props.id;
  useEffect(() => {
    fetchArtikl();
  }, [id]);

  const fetchArtikl = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/artikl/" + id);
      const jsonData = await response.json();
      setArtikli(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "1px solid #9e9e9e",
  }));

  return (
    <React.Fragment>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <Typography sx={{ fontSize: "h4.fontSize" }}>Artikli</Typography>
              <TableRow>
                <TableCell>Naziv</TableCell>
                <TableCell>Dobavljač</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artikli ? (
                artikli.map((item, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <CustomTableCell>{item.naziv}</CustomTableCell>
                    <CustomTableCell align="left">
                      {item.dobavljac}
                    </CustomTableCell>
                    <CustomTableCell align="left">
                      {item.status}
                    </CustomTableCell>
                  </TableRow>
                ))
              ) : (
                <CircularProgress />
              )}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </React.Fragment>
  );
}

ArtikliRows.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ArtikliRows;
