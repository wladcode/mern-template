import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { shape, string } from "prop-types";
import "./ds-input.scss";

const DSFormInputFormikComponent = ({
  id,
  label,
  field,
  form,
  customValue = null,
  ...otherProps
}) => {
  const { name, value } = field;
  const { setFieldValue, errors, touched } = form;

  useEffect(() => {
    if (customValue) {
      setFieldValue(name, customValue);
    }
  }, []);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };
  return (
    <TextField
      {...field}
      id={id}
      label={label}
      required
      fullWidth
      size="small"
      margin="dense"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      value={value}
      {...otherProps}
    />
  );
};

DSFormInputFormikComponent.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  field: shape({}).isRequired,
  form: shape({}).isRequired,
  customValue: shape({}),
};

export default DSFormInputFormikComponent;
