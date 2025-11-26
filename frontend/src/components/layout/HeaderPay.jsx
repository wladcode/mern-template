import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
//import useStyles from "./css/HeaderPay-material.css";

import InputBase from "@mui/material/InputBase";
import { alpha, styled, useColorScheme } from "@mui/material/styles";
import { func } from "prop-types";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { closeSession } from "../../redux/authSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HeaderPay = ({ handleDrawerOpen }) => {
  const dispatch = useDispatch();
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.currentUser);

  //const { classes } = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSession = () => {
    dispatch(closeSession());
    navigate("/");
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="menuId"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
      onClick={handleClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Cuenta</MenuItem>
      <MenuItem onClick={() => handleCloseSession()}>Cerrar sessión</MenuItem>
    </Menu>
  );

  const renderColorButton = () => {
    if (!mode) {
      return null;
    }

    if (mode === "dark") {
      return (
        <IconButton
          aria-label="fingerprint"
          onClick={() => {
            setMode("light");
          }}
        >
          <LightModeIcon />
        </IconButton>
      );
    }
    return (
      <IconButton
        aria-label="fingerprint"
        color="white"
        onClick={() => {
          setMode("dark");
        }}
      >
        <NightlightIcon />
      </IconButton>
    );
  };

  return (
    <header>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            size="large"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Easy dashboards
          </Typography>

          <div>
            {userData.name}
            {renderColorButton()}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <Avatar alt="user logo" src={userData.imageUrl} />
            </IconButton>

            {renderMenu}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </header>
  );
};

HeaderPay.propTypes = {
  handleDrawerOpen: func.isRequired,
};

export default HeaderPay;
