import { bool, node } from "prop-types";
import React from "react";
import "./ds-button.scss";
import { Button } from "@mui/material";

const DSButtonComponent = ({ children, socialSignIn, ...otherProps }) => {
  return (
    <Button
      className={`${socialSignIn ? "social-sign-in" : ""} custom-button`}
      size="small"
      variant="contained"
      {...otherProps}
    >
      {children}
    </Button>
  );
};

DSButtonComponent.propTypes = {
  children: node.isRequired,
  socialSignIn: bool,
};

export default DSButtonComponent;
