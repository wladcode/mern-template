import React from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { bool, shape, string, func } from "prop-types";
import { useDispatch } from "react-redux";
import {
  setAddSpentModal,
  setSpentTypeSelected,
} from "../../../redux/calendarSlice";
import SpentItem from "./SpentItem";
import MoneyDisplay from "../../../components/commons/wc/MoneyDisplay";

const SpentItemAccordion = ({
  id,
  data,
  isForReport = false,
  showType = false,
  handleSelectSpent,
  isExpanded = false,
}) => {
  const dispatch = useDispatch();

  const loadDataToModal = () => {
    dispatch(setAddSpentModal(true));
    dispatch(setSpentTypeSelected(data.spentType));
  };

  data.items.sort((a, b) => b.amount - a.amount);

  return (
    <Accordion sx={{ width: "100%" }} defaultExpanded={isExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: "0.75rem",
          }}
        >
          <Typography variant="h6">{data.groupName}</Typography>
          <MoneyDisplay value={data.totalAmount} />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {data.items.map((spent) => (
          <SpentItem
            key={spent._id}
            spent={spent}
            handleSelectSpent={handleSelectSpent}
            isForReport={isForReport}
            showType={showType}
          />
        ))}
      </AccordionDetails>

      {!isForReport && (
        <AccordionActions>
          <Button onClick={loadDataToModal}>Add</Button>
        </AccordionActions>
      )}
    </Accordion>
  );
};

SpentItemAccordion.propTypes = {
  id: string.isRequired,
  data: shape({}).isRequired,
  handleSelectSpent: func.isRequired,
  isForReport: bool,
  isExpanded: bool,
  showType: bool,
};

export default SpentItemAccordion;
