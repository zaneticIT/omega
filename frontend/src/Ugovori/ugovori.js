import React, { useState, useEffect } from "react";
import { CircularProgress, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArtikliRows from "../Artikli/artikli";
//import Artikli from "../Artikli/artikli";

function UgovoriTable() {
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

  function UgovoriRows(props) {
    const [open, setOpen] = React.useState(false);
    const item = props.item;
    return (
      <React.Fragment>
        <TableRow
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
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right">{item.kupac}</TableCell>
          <TableCell align="right">{item.broj_ugovora}</TableCell>
          <TableCell align="right">{item.datum_akonotacije}</TableCell>
          <TableCell align="right">{item.rok_isporuke}</TableCell>
          <TableCell align="right">{item.status}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Naziv</TableCell>
                      <TableCell>Dobavljač</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <ArtikliRows id={item.id} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  UgovoriRows.propTypes = {
    item: PropTypes.shape({
      kupac: PropTypes.string.isRequired,
      broj_ugovora: PropTypes.string.isRequired,
      datum_akonotacije: PropTypes.string.isRequired,
      rok_isporuke: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: ugovori ? "" : "25vh",
        maxWidth: 0.6,
        marginRight: "auto",
        marginLeft: "auto",
        boxShadow: 5,
      }}
    >
      {ugovori ? (
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Kupac</TableCell>
              <TableCell align="right">Broj ugovora</TableCell>
              <TableCell align="right">Datum akonotacije</TableCell>
              <TableCell align="right">Rok isporuke</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ugovori.map((item, index) => (
              <UgovoriRows item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <span>
          <CircularProgress />
        </span>
      )}
    </TableContainer>
  );
}
export default UgovoriTable;
