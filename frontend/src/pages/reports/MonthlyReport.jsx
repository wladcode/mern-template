import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import DSButtonComponent from "@components/commons/ds/ds-button/ds-button.component";
import { startOfDay } from "date-fns";
import { getSplitDate } from "@utils/spents";
import { PropTypes } from "prop-types";
import VerticalBarChartReport from "./components/barchart/VerticalBarChartReport";

function MonthlyReport({
  allData  = [],
}) {
  const [dataForReport, setDataForReport] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allValue, setAllValue] = useState(null);

  const handleAllValue = () => {
    setAllValue("all");
    setCurrentDate(null);
  };

  useEffect(() => {
    const orderedData = Object.values( allData).sort((a, b) => new Date(b.FECHA) - new Date(a.FECHA));
    if (allValue === "all") {
      setDataForReport(orderedData);
    } else {
      const filteredSpent = orderedData.filter((item) => {
        const current = startOfDay(currentDate).toISOString();
        const arraySpentDate = getSplitDate(item.FECHA);
        const arrayCurrentDate = getSplitDate(current);
        return arraySpentDate[1] === arrayCurrentDate[1];
      });

      setDataForReport(filteredSpent);
    }
  }, [allData, allValue, currentDate]);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setAllValue(null);
  };

   /* const handleBarClick = (d) => {
      let recordSelected = dataForReport[d.dataIndex];
      const { items } = recordSelected;
  
      const orderedItems = orderedByDate(items);
  
      recordSelected.items = orderedItems;
  
      if (selectItem) {
        selectItem(recordSelected);
      }
    };*/

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ marginTop: 2 }}
            label="Select a month"
            views={["month"]}
            openTo="month"
            disableFuture
            size="small"
            closeOnSelect={true}
            value={currentDate}
            onChange={(newValue) => handleDateChange(newValue)}
            slotProps={{
              desktopPaper: { sx: { height: 280 } },

              toolbar: {
                hidden: true,
              },

              actionBar: {
                actions: [],
              },

              dialog: {
                sx: {
                  "& .MuiDateCalendar-root": {
                    height: 280,
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        <DSButtonComponent onClick={handleAllValue}>View all</DSButtonComponent>
      </Box>

      <VerticalBarChartReport
              xLabel="Payments of month"
              xDataKey="MARCA"
              serieDataKey="VALOR_FAC"
              dataForReport={dataForReport}
              //handleBarClick={handleBarClick}
              customHigh={700}
            />
    </Box>
  );
}

MonthlyReport.propTypes = {
  allData: PropTypes.array.isRequired,
};

export default MonthlyReport;
