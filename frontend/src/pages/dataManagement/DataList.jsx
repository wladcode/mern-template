import React from "react";
import { Container } from "@mui/material";
import { AddSpentModal } from "./AddSpentModal";
import ListDataAccordion from "./components/ListDataAccordion";
import CalendarNavBar from "./components/CalendarNavBar";

export const DataList = () => {
  return (
    <div>
        <h1>Manage Data</h1>
        <CalendarNavBar />
        <ListDataAccordion />

      <AddSpentModal />
    </div>
  );
};
