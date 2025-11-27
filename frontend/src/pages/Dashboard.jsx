import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import MonthlyReport from "./reports/MonthlyReport";
import { useDispatch, useSelector } from "react-redux";
import { loadAllExampleList } from "@redux/exampleSlice";
import ResponsiveBarChart from "./reports/components/barchart/ResponsiveBarChart";

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
  const allData = useSelector((state) => state.example.exampleListAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllExampleList({}));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderYearlyReport = () => {
    return (
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ResponsiveBarChart
        dataForReport={allData}
        minValue={1200}
        maxValue={2000}
        customHigh={350}
      />
    </Box>
    )
  }

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
        {renderYearlyReport()}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MonthlyReport allData={allData} />
      </CustomTabPanel>
    </Box>
  );
}
