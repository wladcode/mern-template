import React from "react";
import { bool, number, shape, string } from "prop-types";
import { Typography } from "@mui/material";
import { getFormattedMoney } from "../../../utils/spents";

const getColor = (isRefund, isOverBudget) => {
  if (isRefund) {
    return "success.main";
  }

  if (isOverBudget) {
    return "error.main";
  }

  return "text.primary";
};

const MoneyDisplay = ({
  label = "",
  value,
  currency = "USD",
  locale = "en-US",
  style = {},
  isRefund = false,
  isOverBudget = false,
}) => {
  const formattedValue = getFormattedMoney(value, currency, locale);

  if (label) {
    return (
      <Typography
        sx={{
          fontSize: "1rem",
          ...style,
          color: getColor(isRefund, isOverBudget),
        }}
        variant="h6"
        color="text.primary"
      >
        {label} : {formattedValue}
      </Typography>
    );
  }

  return (
    <Typography
      sx={{
        fontSize: "0.75rem",
        color: getColor(isRefund, isOverBudget),
      }}
      variant="subtitle"
      color="text.primary"
    >
      {formattedValue}
    </Typography>
  );
};

MoneyDisplay.propTypes = {
  value: number.isRequired,
  currency: string,
  locale: string,
  label: string,
  style: shape({}),
  isRefund: bool,
  isOverBudget: bool,
};

export default MoneyDisplay;
