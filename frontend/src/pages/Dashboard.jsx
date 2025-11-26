import { Box, Container, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import YearlyReport from "./reports/YearlyReport";
import MonthlyReport from "./reports/MonthlyReport";
import { useDispatch } from "react-redux";
import { loadAllExample } from "@redux/exampleSlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Dashboard() {
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllExample({}));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 800 },
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="icon label tabs example"
        >
          <Tab label="Annual" wrapped />
          <Tab label="Monthly" wrapped />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <YearlyReport />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MonthlyReport />
      </CustomTabPanel>
    </Box>
  );
}
