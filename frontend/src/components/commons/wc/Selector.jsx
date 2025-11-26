import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const Selector = ({
  id,
  label,
  value,
  data,
  handleChange,
  ...other
}) => {
  return (
    <FormControl sx={{ m: 1, width: 120 }} size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        MenuProps={MenuProps}
        {...other}
      >
        {data.map((item) => (
          <MenuItem value={item.id}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
