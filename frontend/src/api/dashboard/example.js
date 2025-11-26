import { getMonth, getYear } from "date-fns";
import {
  executeDelete,
  executeGet,
  executePost,
  executePut,
} from "./axiosConfig";

const URL = "/v1/examples";

export const apiLoadAllExamples = async () => {
  return executeGet(`${URL}`);
};

export const apiLoadExampleById = async (id) => {
  return executeGet(`${URL}`, id);
};

export const apiLoadExamplesByDate = async (date) => {
  const currentDate = new Date(date);
  
  const startDate = new Date(Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    0, 0, 0, 0
  ));
  
  const endDate = new Date(Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    23, 59, 59, 999
  ));

  console.log("Dates sent:");
  console.log(startDate, endDate);

  return executeGet(`${URL}/date?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
};

export const apiLoadExamplesByMonth = async (date) => {
  const currentDate = new Date(date);
  const year = getYear(currentDate);
  const month = getMonth(currentDate) + 1;

  return executeGet(`${URL}/month`, `${year}/${month}`);
};

export const apiLoadExamplesByYear = async (year = null) => {
  const currentDate = new Date();
  const currentYear = year || getYear(currentDate);

  return executeGet(`${URL}/year`, `${currentYear}`);
};

export const apiAddOrEditExample = async (values) => {
  const {
    id,
    canal,
    fecha,
    proviene,
    marca,
    modelo,
    anio,
    valorFac,
    valorRepuestos,
    valorMO,
    servicio,
    telefono,
  } = values;

  const exampleData = {
    canal,
    fecha,
    proviene,
    marca,
    modelo,
    anio,
    valorFac,
    valorRepuestos,
    valorMO,
    servicio,
    telefono,
  };

  if (id) {
    return executePut(`${URL}/${id}`, exampleData);
  }

  return executePost(`${URL}/`, exampleData);
};

export const apiDeleteExample = async (id) => {
  return executeDelete(`${URL}/${id}`);
};
