import React, { useEffect, useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";

//import { selectCurrentUser } from "../../../../../redux/user/user-selector";
import { isUserLoggedIn } from "./../../../../../api/util";
import "./css/singin-singup.scss";

import SignUpComponent from "./sign.up.component";
import SignInComponent from "./sign-in.component";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function SingUnSingUpPage() {
  const [value, setValue] = useState(0);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn(currentUser)) {
      navigate("/easyDashboard");
    }
  }, [navigate, currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          <Tab label="Login" />
          <Tab label="Registro" />
        </Tabs>
      </Box>

      {value === 0 ? <SignInComponent /> : <SignUpComponent />}
    </>
  );
}

export default SingUnSingUpPage;
