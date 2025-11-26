import axios from "axios";
import {
  API_URL,
  setErrorResponse,
  setSuccessResponse,
  setUserToSessionStorage,
} from "./../util";

const authAxios = axios.create({
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
});

authAxios.defaults.baseURL = API_URL;

authAxios.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    const { header } = data;
    if (status === 200 || status === 201 || status === 400) {
      if (header.code === "200" && data.data.token) {
        registerSuccessLoginJWT(data.data, "", "");
        return setSuccessResponse(response);
      } else if (header.code === "200") {
        return setSuccessResponse(response);
      } else {
        return setErrorResponse(header.message);
      }
    } else if (status === 401) {
      return setErrorResponse(header.message);
    } else {
      return setErrorResponse(`${status}-${data.error}`);
    }
  },
  (error) => {
    return setErrorResponse(error);
  }
);

export default authAxios;

export const executePost = (url, params, headers) => {
  return authAxios.post(`${url}`, { ...params }, headers);
};

export async function registerSuccessLoginJWT(user, token, imageUrl) {
  try {
    const userData = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token: user.token || token,
      imageUrl: imageUrl,
    };

    setUserToSessionStorage(userData);
  } catch (error) {
    console.log("Error: ", error);
  }
}
