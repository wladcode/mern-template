import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotals,
  groupAndSortSpentNotOverBudget,
} from "../../../utils/spents";
import { loadSpentData, setAddSpentModal } from "../../../redux/calendarSlice";
import MoneyDisplay from "../../../components/commons/wc/MoneyDisplay";

const ListDataAccordion = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.example.exampleList);

  console.log("DataListAccordion dataList:", dataList);

  const handleSelectSpent = (spent) => {
    dispatch(setAddSpentModal(true));
    dispatch(loadSpentData(spent));
  };

  const renderData = () => {
    if (dataList.length === 0) {
      return <Box>No hay gastos</Box>;
    }

    const totalAmount = getTotals(dataList);

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            alignItems: "end",
          }}
        >
          <MoneyDisplay
            label="Total in spents"
            value={totalAmount}
            style={{
              borderRadius: "25px",
              border: "1px solid #f29e0c",
              background: "#f29e0c",
              padding: "5px",
              fontSize: "0.80rem",
            }}
          />
          {dataList.map((data) => (
            <div key={data._id}>
              <span>{data.VALOR_FAC}</span>
            </div>
          ))}
        </Box>
      </>
    );
  };

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
      {renderData()}
    </Box>
  );
};

ListDataAccordion.propTypes = {};

export default ListDataAccordion;
