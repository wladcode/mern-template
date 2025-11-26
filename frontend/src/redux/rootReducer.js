import { combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "./exampleSlice";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import loaderReducer from "./loaderSlice";
import spentReducer from "./calendarSlice";
import profileUserReducer from "./profileSlice";

import { removeUserFromSessionStorage } from "../api/util";
// Combine reducers
const appReducer = combineReducers({
  example: exampleReducer,
  auth: authReducer,
  message: messageReducer,
  loader: loaderReducer,
  spent: spentReducer,
  profileUser: profileUserReducer,

});

// Define initial state
const rootInitialState = appReducer(undefined, {});

// Root reducer with reset logic
const rootReducer = (state, action) => {
  if (action.type === "auth/closeSession") {
    removeUserFromSessionStorage();

    return rootInitialState; // Reset the state to its initial values
  }
  return appReducer(state, action);
};

export default rootReducer;
