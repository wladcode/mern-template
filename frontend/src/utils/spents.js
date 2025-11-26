import { format } from "date-fns";

export const getSplitDate = (date) => {
  const stringDate = date.split("T")[0];
  return stringDate.split("-");
};

export const orderedByDate = (items) =>
  items.sort((a, b) => new Date(a.date) - new Date(b.date));

export const groupByMonth = (spentList) => {
  spentList = spentList.filter((spent) => !spent.isOverBudget);

  const groupedData = spentList.reduce((acc, spent) => {
    const { date, amount } = spent;

    const arrayDate = getSplitDate(date);
    const year = arrayDate[0];
    const month = arrayDate[1];

    const monthName = format(arrayDate, "MMMM");

    const groupedBy = `${year}-${month}`; // Create a key with the year and month of the date as a string
    if (!acc[groupedBy]) {
      acc[groupedBy] = {
        month: month,
        year: year,
        items: [],
        totalAmount: 0.0,
        groupName: monthName,
      };
    }

    acc[groupedBy].items.push(spent);
    acc[groupedBy].totalAmount += amount;

    return acc;
  }, {});

  const data = Object.entries(groupedData);

  const dataForReport = data.map(([id, data]) => {
    return {
      groupName: data.groupName,
      totalAmount: data.totalAmount,
      items: data.items,
    };
  });
  return dataForReport;
};

export const groupAndSortSpentNotOverBudget = (spentList, spentTypes) => {
  spentList = spentList.filter((spent) => !spent.isOverBudget);

  return groupAndSortSpentAll(spentList, spentTypes);
};

export const groupAndSortSpentNoOverNoRefund = (spentList, spentTypes) => {
  spentList = spentList.filter(
    (spent) => !spent.isOverBudget && !spent.isRefund
  );

  return groupAndSortSpentAll(spentList, spentTypes);
};

const groupAndSortSpentAll = (spentList, spentTypes) => {
  const groupedData = spentList.reduce((acc, spent) => {
    const { spentType, amount } = spent;

    const filteredSpentType = spentTypes.find((item) => {
      return item.id === spentType.id;
    });

    const groupedBy = filteredSpentType?.id || 99999;

    if (!acc[groupedBy]) {
      acc[groupedBy] = { spentType: {}, items: [], totalAmount: 0.0 };
    }

    acc[groupedBy].spentType = filteredSpentType || {
      id: 99999,
      name: "NO DEFINIDO",
    };
    acc[groupedBy].groupName = filteredSpentType?.name || "NO DEFINIDO";
    acc[groupedBy].items.push(spent);
    acc[groupedBy].totalAmount += amount;

    return acc;
  }, {});

  const orderedData = Object.values(groupedData).sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  return Object.entries(orderedData);
};

export const getTotals = (dataList) => {
  const totalAmount = dataList.reduce((acc, item) => {
    return acc + item.VALOR_FAC;
  }, 0);

  return totalAmount;
};

export const getFormattedMoney = (
  value,
  currency = "USD",
  locale = "en-US"
) => {
  // Format the value as currency with 2 decimals
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const orderByName = (items) => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
};

export const minusRefunds = (spentList) => {
  const spentData = spentList.map((spent) => {
    if (spent.isRefund) {
      spent.amount = spent.amount * -1;
    }

    return spent;
  });

  return spentData;
};
