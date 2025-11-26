import React, { useEffect, useState } from "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";

import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

import { groupAndSortSpentNoOverNoRefund } from "../../utils/spents";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { loadSpentsList } from "../../redux/calendarSlice";

import "./reports.scss";

const PieChartReportCurrentMonth = () => {
  const spentList = useSelector((state) => state.spent.spentList);
  const spentTypes = useSelector((state) => state.profileUser.spentTypes);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    dispatch(
      loadSpentsList({
        currentDate: currentDate.toISOString(),
        byType: "month",
      })
    );
  }, [dispatch, currentDate]);

  const spentListGrouped = groupAndSortSpentNoOverNoRefund(spentList, spentTypes);
  const dataForReport = spentListGrouped.map(([id, data]) => {
    return {
      id,
      value: data.totalAmount,
      label: data.groupName,
      items: data.items,
    };
  });

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const getGrandTotal = dataForReport.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
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

      <Box>Total: ${getGrandTotal}</Box>

      <PieChart
        className="chart-container"
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "0.75em",
          },
        }}
        colors={cheerfulFiestaPalette}
        series={[
          {
            data: dataForReport,
            innerRadius: 12,
            paddingAngle: 2,
            cornerRadius: 5,
            arcLabel: (item) => `$ ${item.value}`,
            arcLabelMinAngle: 20,
            arcLabelRadius: "80%",
            valueFormatter: (item) => `$ ${item.value}`,
          },
        ]}
        height={500}
        margin={{ top: 0, right: 0, bottom: 150, left: 0 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            itemMarkWidth: 20,
            itemMarkHeight: 5,
            markGap: 5,
            itemGap: 10,
            labelStyle: {
              fontSize: 12,
            },
          },
        }}
      />
    </Box>
  );
};

PieChartReportCurrentMonth.propTypes = {};

export default PieChartReportCurrentMonth;
