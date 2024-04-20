import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { convertDateToGeneral } from "../functions/functions";
import UgovoriInputs from "./UgovoriInputs";

function UgovoriForm() {
  const [formData, setFormData] = useState({
    kupac: "Ivan Horvat",
    broj_ugovora: "1/2024",
    datum_akonotacije: convertDateToGeneral(new Date()),
    rok_isporuke: convertDateToGeneral(new Date()),
    status: "KREIRANO",
  });
  const [validInputs, setValidInputs] = useState({
    kupac: true,
    broj_ugovora: true,
    datum_akonotacije: true,
    rok_isporuke: true,
    status: true,
  });

  const placeholders = [
    "Ivan Horvat",
    "1/2024",
    convertDateToGeneral(new Date()),
    convertDateToGeneral(new Date()),
    "KREIRANO",
  ];

  const postUgovori = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/add/ugovori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (e) {}
  };

  //^([1-9]|1[0-2])\/\d{4}$

  const handleSubmit = (e) => {
    e.preventDefault();
    postUgovori();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between">
          <Grid item xs={1.5}></Grid>
          {Object.keys(formData).map((item, index) => (
            <Grid item xs={1.5}>
              <UgovoriInputs
                formData={formData}
                setFormData={setFormData}
                validInputs={validInputs}
                setValidInputs={setValidInputs}
                key={index}
                name={item}
                placeholder={placeholders[index]}
              />
            </Grid>
          ))}
          <Grid item xs={1}>
            <Button onClick={handleSubmit}>Dodaj</Button>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
export default UgovoriForm;
