import { setErrorResponse } from "./../util";
import authAxios, { executePost, registerSuccessLoginJWT } from "./axiosConfig";

export const executeBasicAuthentication = async (email, password) => {
  return await executePost(
    "/v1/authenticate/",
    {},
    {
      headers: {
        Authorization: createBasicAuthToken(email, password),
      },
    }
  );
};

export const executeJWTAuthenticationWithFirebase = async (
  tokenFirebase,
  imageUrl
) => {
  try {
    const response = await authAxios.post("/authenticateFirebase", {
      tokenFirebase: tokenFirebase,
    });

    if (response.data.header.code === "200") {
      await registerSuccessLoginJWT(
        response.data.data,
        tokenFirebase,
        imageUrl
      );
      return { id: response.data.data.id };
    } else {
      throw new Error(response.data.header.message);
    }
  } catch (error) {
    return setErrorResponse(error);
  }
};

export const executeJWTAuthenticationWithGoogle = async (
  userData,
  token,
  imageUrl
) => {
  try {
    /*const response = await authAxios.post(      "/authenticateFirebase",
      {
        tokenFirebase: tokenFirebase,
      }
    );


    if (response.data.header.code === "200") {
      await registerSuccessLoginJWT(response.data.data, tokenFirebase);
      return { id: response.data.data.id };
    } else {
      throw new Error(response.data.header.message);
    }
    */

    await registerSuccessLoginJWT(userData, token, imageUrl);
  } catch (error) {
    return setErrorResponse(error);
  }
};

export function createBasicAuthToken(username, password) {
  return "Basic " + window.btoa(`${username}:${password}`);
}
