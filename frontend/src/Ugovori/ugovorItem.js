import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import ArtikliRows from "../Artikli/artikli";
import { styled } from "@mui/material/styles";
import { convertDateToCroatian } from "../functions/functions";
import DeleteIcon from "@mui/icons-material/Delete";

function UgovorItem(props) {
  const id = props.item;
  console.log(props);

  const CustomTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      filter: "brightness(90%)",
      cursor: "pointer",
    },
    "& > *": { borderBottom: "1" },
    "&:last-child td, &:last-child th": { border: 0 },
  }));

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
    const open = true;
    const item = props.item;
    return (
      <React.Fragment>
        <CustomTableRow
          sx={{
            backgroundColor: delegateColors(item.status) + "!important",
          }}
          onClick={() => {}}
        >
          <TableCell>
            <DeleteIcon color="error" />
          </TableCell>
          <TableCell align="right">{item.kupac}</TableCell>
          <TableCell align="right">{item.broj_ugovora}</TableCell>
          <TableCell align="right">
            {convertDateToCroatian(item.rok_isporuke)}
          </TableCell>
          <TableCell align="right">{item.status}</TableCell>
          <TableCell align="right"></TableCell>
        </CustomTableRow>
        <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <ArtikliRows id={item.id} open={open} />
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
        Kupoprodajni ugovor {id.broj_ugovora}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 0.8,
          marginRight: "auto",
          marginLeft: "auto",
          boxShadow: 5,
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Kupac</TableCell>
              <TableCell align="right">Broj ugovora</TableCell>
              <TableCell align="right">Rok isporuke</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <UgovoriRows item={id} key={1} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box>f</Box>
    </React.Fragment>
  );
}
export default UgovorItem;
