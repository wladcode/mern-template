import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { groupByMonth } from "@utils/spents";
import { useSelector } from "react-redux";
import ResponsiveBarChart from "./components/barchart/ResponsiveBarChart";
import BarChartReportBySpent from "./components/barchart/BarChartReportBySpent";

function YearlyReport() {
  const spentList = useSelector((state) => state.spent.spentListAll);
  const [dataForReport, setDataForReport] = useState([]);
  const [spentByMonth, setSpentByMonth] = useState(null);

  useEffect(() => {
    const dataForReport = groupByMonth(spentList);
    setDataForReport(dataForReport);
  }, [spentList]);

  const getDataFromReportBySent = (selectedSpent) => {
    console.log("getDataFromReportBySent", selectedSpent);
    const data = groupByMonth(selectedSpent.items);
    setSpentByMonth({
      items: data,
      totalAmount: selectedSpent.totalAmount,
      groupName: selectedSpent.groupName,
    });

    console.log("data", data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/*<OverBudgetData spents={spentList} isForReport />*/}
      <ResponsiveBarChart
        dataForReport={dataForReport}
        minValue={1200}
        maxValue={2000}
        customHigh={350}
      />

      <BarChartReportBySpent
        spentList={spentList}
        customHigh={700}
        selectItem={getDataFromReportBySent}
      />
      {spentByMonth && (
        <ResponsiveBarChart
          dataForReport={spentByMonth.items}
          minValue={1}
          maxValue={300}
          customHigh={350}
          xLabel={`Spent in the year of ${spentByMonth.groupName}`}
        />
      )}
    </Box>
  );
}

YearlyReport.propTypes = {};

export default YearlyReport;
