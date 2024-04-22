import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Checkbox,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Autocomplete,
  createFilterOptions,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { convertDateToCroatian } from "../functions/functions";
import UgovorItem from "./ugovorItem";
import DeleteIcon from "@mui/icons-material/Delete";

function UgovoriTable() {
  const [ugovori, setUgovori] = useState(null);
  const [ugovoriList, setUgovoriList] = useState({
    id: null,
    kupac: "",
    broj_ugovora: "",
    status: "",
  });
  const [currId, setCurrId] = useState(1);

  useEffect(() => {
    fetchUgovori();
  }, []);

  const CustomTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      filter: "brightness(90%)",
      cursor: "pointer",
    },
    "& > *": { borderBottom: "1" },
    "&:last-child td, &:last-child th": { border: 0 },
  }));

  const fetchUgovori = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/ugovori");
      const jsonData = await response.json();
      setUgovori(jsonData);
      setUgovoriList(
        jsonData.map((item) => {
          return {
            id: item.id,
            kupac: item.kupac,
            broj_ugovora: item.broj_ugovora,
            status: item.status,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) => option.kupac + option.status,
  });

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
    const item = props.item;
    return (
      <React.Fragment>
        <CustomTableRow
          sx={{
            backgroundColor: delegateColors(item.status) + "!important",
          }}
          onClick={() => setCurrId(item.id)}
        >
          <TableCell>
            <Checkbox size="small" color="success" />
          </TableCell>
          <TableCell align="right">{item.kupac}</TableCell>
          <TableCell align="right">{item.broj_ugovora}</TableCell>
          <TableCell align="right">
            {convertDateToCroatian(item.rok_isporuke)}
          </TableCell>
          <TableCell align="right">{item.status}</TableCell>
          <TableCell align="right"></TableCell>
        </CustomTableRow>
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
            <Autocomplete
              id="search bar"
              options={ugovoriList.sort(
                (a, b) => -b.status.localeCompare(a.status)
              )}
              groupBy={(option) => option.status}
              filterOptions={filterOptions}
              getOptionLabel={(option) =>
                option.kupac + " " + option.broj_ugovora
              }
              sx={{ width: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Kupac/status" />
              )}
            />
            <TableHead>
              <TableRow>
                <TableCell>
                  <DeleteIcon sx={{ my: 1, mx: 1 }} />
                </TableCell>
                <TableCell align="right">Kupac</TableCell>
                <TableCell align="right">Broj ugovora</TableCell>
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
      {ugovori ? <UgovorItem item={ugovori[currId-1]} /> : ""}
    </React.Fragment>
  );
}
export default UgovoriTable;
