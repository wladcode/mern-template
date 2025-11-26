import React from "react";
import { Box, Switch, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

function CustomSwitch({
  name,
  label,
  value,
  icon,
  handleOnChange = null,
  disabled = false,
}) {
  const handleChangeState = (event) => {
    if (handleOnChange) {
      handleOnChange(event);
    }
  };

  return (
    <Box
      spacing={1}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
        width: "100%",
        gap: 1,
      }}
    >
      {value && icon}
      <Typography>{label}</Typography>
      <Switch
        checked={value}
        onChange={handleChangeState}
        name={name}
        size="small"
        disabled={disabled}
      />
    </Box>
  );
}

CustomSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  icon: PropTypes.element,
  handleOnChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomSwitch;
