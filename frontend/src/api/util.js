export const API_URL = "/api";

export const USERNAME_SESSION = "user_profile";
export const NETWORK_MESSAGE = "Network Error";

export function setUserToSessionStorage(data) {
  sessionStorage.setItem(USERNAME_SESSION, JSON.stringify(data));
}
export function getUserFromSessionStorage() {
  return JSON.parse(sessionStorage.getItem(USERNAME_SESSION));
}

export function removeUserFromSessionStorage() {
  sessionStorage.removeItem(USERNAME_SESSION);
}

export function setSuccessResponse(response) {
  const { header, data } = response.data;

  if (header.code === "200") {
    return {
      data: data,
      message: header.message,
    };
  }

  throw new Error(header.message);
}

export function setErrorResponse(error) {
  let errorMessage = error;

  if (error.message) {
    errorMessage = error.message;
  } else if (error.response && error.response.data) {
    errorMessage = error.message;
  }

  throw new Error(errorMessage);
}

export function getUserInfo() {
  const user = getUserFromSessionStorage();
  if (user === null) {
    return null;
  }

  return user;
}

function isUserInSession() {
  const user = getUserFromSessionStorage();

  if (user === null) {
    return false;
  }

  return true;
}

export function isUserLoggedIn(currentUser) {
  const userInStore = isUserInSession();

  if (userInStore && currentUser) {
    return true;
  }

  return false;
}
