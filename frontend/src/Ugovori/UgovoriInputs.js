import React, { useState } from "react";
import { Grid, Input, Typography } from "@mui/material";
import { whichInput } from "../functions/functions";

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

  const [currentValue, setCurrentValue] = useState();

  const [valid, setValid] = useState(true);

  const doTheChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidInputs({ ...validInputs, [name]: true });
    setValid(true);
    setCurrentValue(e.target.value);
  };

  const handleChange = (e) => {
    doTheChange(e);
  };

  return (
    <React.Fragment>
      <Grid item>
        <Input
          sx={{ backgroundColor: valid ? "" : "#ef9a9a" }}
          required
          key={key}
          name={name}
          placeholder={placeholder}
          onChange={(e) =>
            whichInput(e.target.value, name)
              ? handleChange(e)
              : (setValidInputs({ ...validInputs, [e.target.name]: false }),
                setValid(false),
                setCurrentValue(e.target.value))
          }
        />
        {valid ? (
          <></>
        ) : (
          <React.Fragment>
            <Typography
              sx={{
                fontSize: 14,
                mx: "auto",
                my: "auto",
                backgroundColor: "#ef9a9a",
              }}
              gutterBottom
            >
              Neispravan podatak: {currentValue}
            </Typography>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}
export default UgovoriInputs;
