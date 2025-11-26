import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

import { getFormattedMoney } from "@utils/spents";

import { PropTypes } from "prop-types";

const VerticalBarChartReport = ({
  xLabel,
  dataForReport = [],
  handleBarClick = null,
  minValue = 1,
  maxValue = 350,
  customHigh = 500,
}) => {
  const [grandTotal, setGrandTotal] = useState(0);

  let customProps = {};

  if (handleBarClick) {
    customProps = {
      onItemClick: (event, d) => handleBarClick(d),
    };
  }

  useEffect(() => {
    const grandTotal = dataForReport.reduce((acc, item) => {
      return acc + item.totalAmount;
    }, 0);

    setGrandTotal(grandTotal);
  }, [dataForReport]);

  return (
    <>
      <BarChart
        sx={{
          bgcolor: "background.paper",
          border: '1px solid #ccc',
          borderRadius: '24px',
        }}
        dataset={dataForReport}
        series={[
          {
            dataKey: "totalAmount",
            label: `Total: ${getFormattedMoney(grandTotal)}`,
            color: "#4e79a7",
            highlightScope: {
              highlighted: "item",
              faded: "global",
            },
          },
        ]}
        xAxis={[
          {
            label: `${xLabel}`,
            colorMap: {
              type: "continuous",
              min: `${minValue}`,
              max: `${maxValue}`,
              color: ["#6bb081", "#b06e6b"],
            },
            tickLabelStyle: {
              fontSize: 9,
              //transform: "rotate(-10deg)",
              //textAnchor: "end",
            },
            tickSize: 5,
            labelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
          },
        ]}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "groupName",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
            tickLabelStyle: {
              fontSize: 9,
              //transform: "rotate(-10deg)",
              //transform: "rotate(-10deg)",
              textAnchor: "end",
            },
            tickSize: 2,
            /*valueFormatter: (value) => {
              const string = value.replace(" ", "\n");
              return `${string}`;
            },*/
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        barLabel={(item) => getFormattedMoney(item.value)}
        margin={{ left: 90, right: 50 }}
        height={customHigh}
        slotProps={{
          barLabel: {
            sx: {
              fontSize: 11,
              fontWeight: "bold",
              textAnchor: "start", // Align the label at the end of the bar
            },
          },
        }}
        {...customProps}
      />
    </>
  );
};

VerticalBarChartReport.propTypes = {
  xLabel: PropTypes.string.isRequired,
  dataForReport: PropTypes.array.isRequired,
  handleBarClick: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  customHigh: PropTypes.number,
};

export default VerticalBarChartReport;
