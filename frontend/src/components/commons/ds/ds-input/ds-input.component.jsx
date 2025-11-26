import { TextField } from "@mui/material";
import { func, node, shape, string } from "prop-types";
import "./ds-input.scss";

import Grid from "@mui/material/Grid2";

const DSFormInputComponent = ({
  name,
  value,
  label,
  handleChange,
  formik,
  endAdornment = null,
  ...otherProps
}) => {
  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <TextField
        id={name}
        name={name}
        value={formik ? formik.values[name] : value}
        label={label}
        fullWidth={true}
        size="small"
        margin="dense"
        slotProps={{
          input: {
            endAdornment: endAdornment,
          },
        }}
        onChange={formik ? formik.handleChange : handleChange}
        onBlur={formik ? formik.handleBlur : null}
        error={
          formik ? formik.touched[name] && Boolean(formik.errors[name]) : false
        }
        helperText={formik ? formik.touched[name] && formik.errors[name] : ""}
        {...otherProps}
      />
    </Grid>
  );
};

DSFormInputComponent.propTypes = {
  name: string.isRequired,
  value: string,
  label: string.isRequired,
  handleChange: func,
  formik: shape({}),
  endAdornment: node,
};

export default DSFormInputComponent;
