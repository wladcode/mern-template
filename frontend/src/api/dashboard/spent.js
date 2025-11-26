import { getMonth, getYear } from "date-fns";
import {
  executeDelete,
  executeGet,
  executePost,
  executePut,
} from "./axiosConfig";

const URL = "/v1/spents";

export const apiLoadSpents = async (date) => {
  const currentDate = new Date(date);
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;
  const day = currentDate.getDate();

  return executeGet(`${URL}`, `${year}/${month}/${day}`);
};

export const apiLoadSpentsByMonth = async (date) => {
  const currentDate = new Date(date);
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;

  return executeGet(`${URL}`, `${year}/${month}`);
};

export const apiLoadSpentsByYear = async () => {
  const currentDate = new Date();
  const year = getYear(currentDate);

  return executeGet(`${URL}`, `${year}`);
};

export const apiAddOrEditSpent = async (values) => {
  const { spentType, name, amount, date, isOverBudget, isRefund } = values;

  const currentDate = new Date(date);
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;
  const day = currentDate.getDate();

  if (values.id) {
    return executePut(`${URL}/${values.id}`, {
      spentType,
      description: name,
      amount,
      year,
      month,
      day,
      isOverBudget,
      isRefund,
    });
  }

  return executePost(`${URL}/`, {
    spentType,
    description: name,
    amount,
    year,
    month,
    day,
    isOverBudget,
    isRefund,
  });
};

export const apiDeleteSpent = async (id) => {
  return executeDelete(`${URL}/${id}`);
};
