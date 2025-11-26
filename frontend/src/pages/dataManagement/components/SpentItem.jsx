import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { Box } from "@mui/material";
import { format } from "date-fns";
import { bool, func, shape } from "prop-types";
import MoneyDisplay from "../../../components/commons/wc/MoneyDisplay";
import { getSplitDate } from "@utils/spents";

const renderIcon = ({ isOverBudget, isRefund }) => {
  if (isOverBudget) {
    return <TrendingUpOutlinedIcon color="error" fontSize="small" />;
  }

  if (isRefund) {
    return <SavingsOutlinedIcon color="success" fontSize="small" />;
  }

  return <TrendingFlatOutlinedIcon color="primary" fontSize="small" />;
};

const SpentItem = ({
  spent,
  handleSelectSpent = () => {},
  isForReport = false,
  showType = false,
}) => {
  const arrayDate = getSplitDate(spent.date);

  return (
    <Box
      sx={{
        fontSize: "0.75rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        cursor: `${isForReport ? "" : "pointer"}`, // Makes it clickable
        transition: "all 0.3s ease", // Smooth transition
        "&:hover": {
          backgroundColor: "#f5f5f5", // Hover effect
        },
        "&.Mui-expanded": {
          backgroundColor: "#e0e0e0", // Selected effect
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => handleSelectSpent(spent)} // Handle selection
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <div>{renderIcon(spent)}</div>
        {isForReport && <div>{format(arrayDate, "dd/MM/yyyy")}</div>}

        {showType && <div>{spent.spentType.name} - </div>}

        <div>{spent.description}</div>
      </Box>
      <MoneyDisplay
        value={spent.amount}
        isRefund={spent.isRefund}
        isOverBudget={spent.isOverBudget}
      />
    </Box>
  );
};

SpentItem.propTypes = {
  spent: shape({}).isRequired,
  handleSelectSpent: func,
  isForReport: bool,
  showType: bool,
};

export default SpentItem;
