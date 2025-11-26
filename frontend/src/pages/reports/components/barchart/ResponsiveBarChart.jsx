import VerticalBarChartReport from "./VerticalBarChartReport";
import HorizontalBarChartReport from "./HorizontalBarChartReport";
import { useMediaQuery, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";

const ResponsiveBarChart = ({
  dataForReport = [],
  handleBarClick = null,
  minValue = 1,
  maxValue = 350,
  customHigh = 500,
  customHighHorizontal = 250,
  xLabel = "Payments in the year",
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  return (
    <>
      {isSmallScreen ? (
        <VerticalBarChartReport
          xLabel={xLabel}
          dataForReport={dataForReport}
          handleBarClick={handleBarClick}
          minValue={minValue}
          maxValue={maxValue}
          customHigh={customHigh}
        />
      ) : (
        <HorizontalBarChartReport
          xLabel={xLabel}
          dataForReport={dataForReport}
          handleBarClick={handleBarClick}
          minValue={minValue}
          maxValue={maxValue}
          customHigh={customHighHorizontal}
        />
      )}
    </>
  );
};

ResponsiveBarChart.propTypes = {
  dataForReport: PropTypes.array,
  handleBarClick: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  customHigh: PropTypes.number,
  customHighHorizontal: PropTypes.number,
  xLabel: PropTypes.string,
};

export default ResponsiveBarChart;
