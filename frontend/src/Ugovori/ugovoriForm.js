import React, { useState } from "react";
import { Button, Grid, Typography, Alert } from "@mui/material";
import { convertDateToGeneral } from "../functions/functions";
import UgovoriInputs from "./UgovoriInputs";

function UgovoriForm() {
  const [ugovoriFormData, setUgovoriFormData] = useState({
    kupac: "Ivan Horvat",
    broj_ugovora: "1/2024",
    datum_akonotacije: convertDateToGeneral(new Date()),
    rok_isporuke: convertDateToGeneral(new Date()),
    status: "KREIRANO",
  });

  const [validUgovoriInputs, setValidUgovoriInputs] = useState({
    kupac: true,
    broj_ugovora: true,
    datum_akonotacije: true,
    rok_isporuke: true,
    status: true,
  });

  const [validArtikliInputs, setValidArtikliInputs] = useState({
    ugovor_id: true,
    naziv: true,
    dobavljac: true,
    status: true,
  });

  const [artikliFormData, setArtikliFormData] = useState({
    ugovor_id: "#",
    naziv: "Naziv",
    dobavljac: "Dobavljač",
    status: "KREIRANO",
  });

  const placeholdersUgovori = [
    "Ivan Horvat",
    "1/2024",
    convertDateToGeneral(new Date()),
    convertDateToGeneral(new Date()),
    "KREIRANO",
  ];

  const placeholdersArtikli = ["#", "Naziv artikla", "Dobavljač", "KREIRANO"];

  const postUgovori = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/add/ugovori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ugovoriFormData),
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const postArtikli = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/add/artikli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artikliFormData),
      });
    } catch (e) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postUgovori()) postArtikli();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Typography
          sx={{
            fontSize: "h4.fontSize",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          Dodaj ugovor
        </Typography>
        <Grid
          container
          justifyContent="space-evenly"
          sx={{ m: "auto", backgroundColor: "#e0e0e0", width: "50vw" }}
        >
          <Grid item xs={1.5}></Grid>
          {Object.keys(ugovoriFormData).map((item, index) => (
            <UgovoriInputs
              formData={ugovoriFormData}
              setFormData={setUgovoriFormData}
              validInputs={validUgovoriInputs}
              setValidInputs={setValidUgovoriInputs}
              key={index}
              name={item}
              placeholder={placeholdersUgovori[index]}
            />
          ))}
          <Grid item xs={1}>
            <Button onClick={handleSubmit}>Dodaj</Button>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-evenly"
          sx={{ m: "auto", backgroundColor: "#e0e0e0", width: "50vw", pb: 1 }}
        >
          <Grid item xs={2}></Grid>
          {Object.keys(artikliFormData).map((item, index) => (
            <UgovoriInputs
              formData={artikliFormData}
              setFormData={setArtikliFormData}
              validInputs={validArtikliInputs}
              setValidInputs={setValidArtikliInputs}
              key={index}
              name={item}
              placeholder={placeholdersArtikli[index]}
            />
          ))}
          <Grid item xs={4}></Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
export default UgovoriForm;
