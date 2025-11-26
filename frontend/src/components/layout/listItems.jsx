import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HouseIcon from "@mui/icons-material/House";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { useNavigate } from "react-router";

export default function MainListItems() {
  const navigate = useNavigate();
  const menuItems = [
    {
      route: "data",
      label: "Manage Data",
      icon: <AttachMoneyIcon color="primary" />,
    },
    {
      route: "catalogs/example",
      label: "Catalog Example",
      icon: <AssignmentIcon color="primary" />,
    },
    {
      route: "/easyDashboard",
      label: "Dashboard Example",
      icon: <DashboardIcon color="primary" />,
    },
  ];

  return (
    <div>
      {menuItems.map((item) => (
        <ListItem key={item.route} button onClick={() => navigate(item.route)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </div>
  );
}
