import React, { useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import { bool, func, shape, string } from "prop-types";
import "./ds-select.scss";

const DSSelectFormikComponent = ({
  id,
  label,
  field,
  form,
  optionValues,
  withAllValue = false,
  customValue = null,
  customHandleChange = null,
  ...otherProps
}) => {
  const { name, value } = field;
  const { setFieldValue, errors, touched } = form;

  useEffect(() => {
    if (customValue) {
      setFieldValue(name, customValue);
    }
  }, [customValue]);

  let showError = false;
  let messageError = "";
  if (withAllValue) {
    messageError = errors[name]?.name || errors[name];
  } else {
    messageError = errors[name];
  }

  if (messageError) {
    showError = true;
  }

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
    if (customHandleChange) {
      customHandleChange(event.target.value);
    }
  };

  return (
    <TextField
      {...field}
      id={id}
      select
      label={label}
      required
      fullWidth
      size="small"
      margin="dense"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
      error={showError}
      helperText={messageError}
      value={customValue ? customValue : value}
      {...otherProps}
    >
      <MenuItem value={null} disabled>
        <em>Select an Option</em>
      </MenuItem>
      {optionValues.map((option) => (
        <MenuItem key={option.id} value={withAllValue ? option : option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

DSSelectFormikComponent.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  field: shape({}).isRequired,
  form: shape({}).isRequired,
  optionValues: shape([]).isRequired,
  withAllValue: bool,
  customValue: shape({}),
  customHandleChange: func,
};

export default DSSelectFormikComponent;
