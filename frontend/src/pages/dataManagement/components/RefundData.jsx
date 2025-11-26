import React from "react";
import { bool, func, shape } from "prop-types";
import BudgetData from "./BudgetData";

const RefundData = ({
  spents,
  isForReport = false,
  handleSelectSpent = () => {},
}) => {
  const items = spents.filter((item) => item.isRefund);

  if (items?.length === 0) {
    return null;
  }

  items.sort((a, b) => b.amount - a.amount);

  return (
    <BudgetData
      budgetItems={items}
      isForReport={isForReport}
      handleSelectSpent={handleSelectSpent}
      totalLabel="Total refund"
      isRefund
    />
  );
};

RefundData.propTypes = {
  spents: shape([{}]).isRequired,
  handleSelectSpent: func,
  isForReport: bool,
};

export default RefundData;
