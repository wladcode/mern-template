import { executePost } from "./axiosConfig";

const URL =  "/v1/register";

export const apiRegister = async (userData) => {
  return executePost(`${URL}/`, userData);
};
