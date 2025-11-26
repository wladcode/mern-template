import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useSelector } from "react-redux";
import BarChartReportBySpent from "./components/barchart/BarChartReportBySpent";
import DSButtonComponent from "@components/commons/ds/ds-button/ds-button.component";
import { startOfDay } from "date-fns";
import { getSplitDate } from "@utils/spents";

function MonthlyReport() {
  const spentListAll = useSelector((state) => state.spent.spentListAll);
  const [dataForReport, setDataForReport] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allValue, setAllValue] = useState(null);

  const handleAllValue = () => {
    setAllValue("all");
    setCurrentDate(null);
  };

  useEffect(() => {
    if (allValue === "all") {
      setDataForReport(spentListAll);
    } else {
      const filteredSpent = spentListAll.filter((spent) => {
        const current = startOfDay(currentDate).toISOString();
        const arraySpentDate = getSplitDate(spent.date);
        const arrayCurrentDate = getSplitDate(current);
        return arraySpentDate[1] === arrayCurrentDate[1];
      });

      setDataForReport(filteredSpent);
    }
  }, [spentListAll, allValue, currentDate]);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setAllValue(null);
  };

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

      <BarChartReportBySpent spentList={dataForReport} customHigh={700}/>
    </Box>
  );
}

MonthlyReport.propTypes = {};

export default MonthlyReport;
