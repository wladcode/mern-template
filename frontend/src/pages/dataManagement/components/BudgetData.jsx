import { Box } from "@mui/material";
import SpentItem from "./SpentItem";
import MoneyDisplay from "../../../components/commons/wc/MoneyDisplay";
import { bool, func, shape, string } from "prop-types";

const BudgetData = ({
  budgetItems,
  isForReport,
  handleSelectSpent,
  totalLabel = "Total",
  isRefund = false,
  isOverBudget = false,
}) => {
  const total = budgetItems.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        width: "100%",
      }}
    >
      {budgetItems.map((spent, index) => (
        <SpentItem
          key={index}
          spent={spent}
          isForReport={isForReport}
          handleSelectSpent={handleSelectSpent}
          showType
        />
      ))}
      <MoneyDisplay
        label={totalLabel}
        value={total}
        isRefund={isRefund}
        isOverBudget={isOverBudget}
      />
    </Box>
  );
};

BudgetData.propTypes = {
  budgetItems: shape([{}]).isRequired,
  handleSelectSpent: func,
  isForReport: bool,
  totalLabel: string,
  isRefund: bool,
  isOverBudget: bool,
};

export default BudgetData;
