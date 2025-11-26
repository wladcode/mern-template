import axios from "axios";
import {
  API_URL,
  getUserFromSessionStorage,
  setErrorResponse,
  setSuccessResponse,
} from "./../util";
import { closeSession } from "../../redux/authSlice";
import store from "../../redux/store";

const apiAxios = axios.create({
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
});

apiAxios.defaults.baseURL = API_URL;

apiAxios.interceptors.request.use((request) => {
  const user = getUserFromSessionStorage();
  request.headers.authorization = `Bearer ${user.token}`;
  return request;
});

apiAxios.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    const { header } = data;
    if (status === 200 || status === 201 || status === 400) {
      if (header.code === "200") {
        return setSuccessResponse(response);
      } else {
        return setErrorResponse(header.message);
      }
    } else if (status === 401) {
      store.dispatch(closeSession());
      window.location.href = "/";
    } else {
      return setErrorResponse(`${status}-${data.error}`);
    }
  },
  (error) => {
    return setErrorResponse(error);
  }
);

export const executePost = (url, params) => {
  return apiAxios.post(`${url}`, { ...params });
};

export const executePut = (url, params) => {
  return apiAxios.put(`${url}`, { ...params });
};

export const executeGet = (url, params) => {
  if (params) {
    return apiAxios.get(`${url}/${params}`);
  }
  return apiAxios.get(url);
};

export const executeDelete = (url) => {
  return apiAxios.delete(`${url}`);
};
