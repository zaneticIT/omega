import React from "react";
import { Grid, Input } from "@mui/material";
import {
  matchName,
  matchBroj,
  matchDatum,
  whichInput,
} from "../functions/functions";

function UgovoriInputs(props) {
  const {
    formData,
    setFormData,
    validInputs,
    setValidInputs,
    key,
    name,
    placeholder,
  } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidInputs({ ...validInputs, [name]: true });
  };

  return (
    <React.Fragment>
      <Grid item>
        <Input
          key={key}
          name={name}
          placeholder={placeholder}
          onChange={(e) =>
            whichInput(e.target.value, name)
              ? handleChange(e)
              : setValidInputs({ ...validInputs, [e.target.name]: false })
          }
        />
      </Grid>
    </React.Fragment>
  );
}
export default UgovoriInputs;
