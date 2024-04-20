import React, { useState } from "react";
import { Button, Grid, Input } from "@mui/material";
import { convertDateToGeneral } from "../functions/functions";

function UgovoriForm() {
  const [formData, setFormData] = useState({
    kupac: "Ivan Horvat",
    broj_ugovora: "1/2024",
    datum_akonotacije: convertDateToGeneral(new Date()),
    rok_isporuke: convertDateToGeneral(new Date()),
    status: "KREIRANO",
  });

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

  function handleSubmit(e) {
    e.preventDefault();
    postUgovori();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between">
          <Grid item xs={1}></Grid>
          <Grid item>
            <Input
              name="kupac"
              placeholder="Kupac"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Input
              name="broj_ugovora"
              placeholder="Broj ugovora"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Input
              name="datum_akonotacije"
              placeholder="Datum Akonotacije"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Input
              name="rok_isporuke"
              placeholder="Rok isporuke"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Input
              name="status"
              placeholder="Status"
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit}>Dodaj</Button>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
export default UgovoriForm;
