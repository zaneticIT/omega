import React, { useState, useEffect } from "react";
import { CircularProgress, Paper, Typography, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ArtikliRows from "../Artikli/artikli";
import { styled } from "@mui/material/styles";

function UgovoriTable() {
  const [ugovori, setUgovori] = useState(null);

  useEffect(() => {
    fetchUgovori();
  }, []);

  const CustomTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      filter: "brightness(90%)",
      cursor: "pointer",
    },
    "& > *": { borderBottom: "unset" },
    "&:last-child td, &:last-child th": { border: 0 },
  }));

  const fetchUgovori = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/ugovori");
      const jsonData = await response.json();
      setUgovori(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function delegateColors(status) {
    return status === "KREIRANO"
      ? "#66bb6a"
      : status === "NARUČENO"
      ? "#ffa726"
      : status === "ISPORUČENO"
      ? "grey"
      : "";
  }

  function UgovoriRows(props) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const item = props.item;
    return (
      <React.Fragment>
        <CustomTableRow
          sx={{
            backgroundColor: delegateColors(item.status) + "!important",
          }}
        >
          <TableCell>
            <Checkbox size="small" color="success" />
          </TableCell>
          <TableCell align="right">{item.kupac}</TableCell>
          <TableCell align="right">{item.broj_ugovora}</TableCell>
          <TableCell align="right">{item.datum_akonotacije}</TableCell>
          <TableCell align="right">{item.rok_isporuke}</TableCell>
          <TableCell align="right">{item.status}</TableCell>
          <TableCell align="right"></TableCell>
        </CustomTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <Typography sx={{ fontSize: "h4.fontSize" }}>
                      Artikli
                    </Typography>
                    <TableRow>
                      <TableCell>Naziv</TableCell>
                      <TableCell>Dobavljač</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ArtikliRows id={item.id} />
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
    <React.Fragment>
      <Typography
        sx={{
          fontSize: "h4.fontSize",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Kupoprodajni ugovori
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: ugovori ? "" : "25vh",
          maxWidth: 0.8,
          marginRight: "auto",
          marginLeft: "auto",
          boxShadow: 5,
        }}
      >
        {ugovori ? (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
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
    </React.Fragment>
  );
}
export default UgovoriTable;
