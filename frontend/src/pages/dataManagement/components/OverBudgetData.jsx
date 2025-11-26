import React from "react";
import { bool, func, shape } from "prop-types";
import BudgetData from "./BudgetData";

const OverBudgetData = ({
  spents,
  isForReport = false,
  handleSelectSpent = () => {},
}) => {
  const items = spents.filter((item) => item.isOverBudget);

  if (items?.length === 0) {
    return null;
  }

  items.sort((a, b) => b.amount - a.amount);

  return (
    <BudgetData
      budgetItems={items}
      isForReport={isForReport}
      handleSelectSpent={handleSelectSpent}
      totalLabel="Total OverBudget"
      isOverBudget
    />
  );
};

OverBudgetData.propTypes = {
  spents: shape([{}]).isRequired,
  handleSelectSpent: func,
  isForReport: bool,
};

export default OverBudgetData;
