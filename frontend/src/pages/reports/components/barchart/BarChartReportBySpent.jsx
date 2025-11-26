import { useEffect, useState } from "react";

import { groupAndSortSpentNotOverBudget, orderedByDate } from "@utils/spents";
import { useSelector } from "react-redux";

import { PropTypes } from "prop-types";
import VerticalBarChartReport from "./VerticalBarChartReport";

const BarChartReportBySpent = ({
  spentList = [],
  customHigh = 500,
  selectItem = () => {},
}) => {
  const spentTypes = useSelector((state) => state.profileUser.spentTypes);
  const [dataForReport, setDataForReport] = useState([]);

  useEffect(() => {
    const spentListGrouped = groupAndSortSpentNotOverBudget(
      spentList,
      spentTypes
    );

    const dataForReport = spentListGrouped.map(([id, data]) => {
      return {
        groupName: data.groupName,
        totalAmount: data.totalAmount,
        items: data.items,
      };
    });

    setDataForReport(dataForReport);
  }, [spentList, spentTypes]);

  const handleBarClick = (d) => {
    let recordSelected = dataForReport[d.dataIndex];
    const { items } = recordSelected;

    const orderedItems = orderedByDate(items);

    recordSelected.items = orderedItems;

    if (selectItem) {
      selectItem(recordSelected);
    }
  };

  return (
    <>
      <VerticalBarChartReport
        xLabel="Payments of month"
        dataForReport={dataForReport}
        handleBarClick={handleBarClick}
        customHigh={customHigh}
      />
    </>
  );
};

BarChartReportBySpent.propTypes = {
  spentList: PropTypes.array.isRequired,
  customHigh: PropTypes.number,
  selectItem: PropTypes.func,
};

export default BarChartReportBySpent;
