import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import DSButtonComponent from "../../../components/commons/ds/ds-button/ds-button.component";
import {
  addDay,
  loadSpentsList,
  setCurrentDate,
  subtractDay,
} from "../../../redux/calendarSlice";

import {
  loadExampleList,
} from "../../../redux/exampleSlice";
import { date } from "yup";

const CalendarNavBar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.spent.currentDate);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const handlePrevDay = () => {
    // Navigate to the previous day
    dispatch(subtractDay());
  };

  const handleNextDay = () => {
    // Navigate to the next day
    dispatch(addDay());
  };

  const handleDateChange = (newDate) => {
    dispatch(setCurrentDate(newDate.toISOString()));
    setShowDatePicker(false); // Close the calendar after selection
  };

  useEffect(() => {
    console.log("Current Date changed in CalendarNavBar:", currentDate);
    dispatch(
      loadExampleList({
        filterType: "date",
        date: currentDate,
      })
    );
  }, [currentDate, dispatch]);

  const renderMobile = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Navigation Buttons */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            bgcolor: "primary.light",
            borderRadius: 1,
            boxShadow: 1,
            padding: 1,
          }}
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <Typography variant="h6" textAlign="center">
            {format(currentDate, "MMMM yyyy")}
          </Typography>
          <Typography variant="subtitle1">
            {format(currentDate, "EEEE")} - {format(currentDate, "dd")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <DSButtonComponent variant="outlined" onClick={handlePrevDay}>
            Previous Day
          </DSButtonComponent>

          <DSButtonComponent variant="outlined" onClick={handleNextDay}>
            Next Day
          </DSButtonComponent>
        </Box>
      </Box>
    );
  };

  const renderDesktop = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <DSButtonComponent
            variant="outlined"
            onClick={handlePrevDay}
            sx={{ width: "auto" }}
          >
            Previous Day
          </DSButtonComponent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "auto",
              bgcolor: "primary.light",
              borderRadius: 1,
              boxShadow: 1,
              padding: 1,
            }}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Typography variant="h6" textAlign="center">
              {format(currentDate, "MMMM yyyy")}
            </Typography>
            <Typography variant="subtitle1">
              {format(currentDate, "EEE")} - {format(currentDate, "dd")}
            </Typography>
          </Box>

          <DSButtonComponent
            variant="outlined"
            onClick={handleNextDay}
            sx={{ width: "auto" }}
          >
            Next Day
          </DSButtonComponent>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isSmallScreen ? renderMobile() : renderDesktop()}

        {showDatePicker && (
          <Box sx={{ marginTop: 2 }}>
            <DateCalendar
              views={["month", "day"]}
              displayWeekNumber
              disableFuture
              value={currentDate}
              onChange={handleDateChange}
            />
          </Box>
        )}
      </LocalizationProvider>
    </>
  );
};

export default CalendarNavBar;
