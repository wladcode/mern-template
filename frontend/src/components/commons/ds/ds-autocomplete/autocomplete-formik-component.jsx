import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { bool, func, shape, string } from "prop-types";

const DSAutocomplete = (props) => {
  const {
    id,
    label,
    field,
    form,
    optionValues,
    withAllValue = false,
    customValue = null,
    customHandleChange = null,
    ...otherProps
  } = props;

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

  const handleChange = (newValue) => {
    setFieldValue(name, newValue);
    if (customHandleChange) {
      customHandleChange(newValue);
    }
  };
  return (
    <Autocomplete
      options={optionValues}
      size="small"
      getOptionLabel={(option) => {
        if (option?.name) {
          return option?.name;
        } else {
          return "Seleccione un valor";
        }
      }}
      onChange={(event, newValue) => handleChange(newValue)}
      value={value}
      {...otherProps}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="dense"
          error={showError}
          helperText={messageError}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li key={key} {...optionProps}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};

DSAutocomplete.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  field: shape({}).isRequired,
  form: shape({}).isRequired,
  optionValues: shape([]).isRequired,
  withAllValue: bool,
  customValue: shape({}),
  customHandleChange: func,
};

export default DSAutocomplete;
