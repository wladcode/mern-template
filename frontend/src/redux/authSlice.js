import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { executeBasicAuthentication } from "../api/auth/authentication";
import { setErrorMessage, setSuccessMessage } from "./messageSlice";
import { setLoaderActive } from "./loaderSlice";
import { apiRegister } from "../api/auth/register";
import { fetchSpentTypes } from "./profileSlice";
import { getUserFromSessionStorage } from "../api/util";

const INITIAL_STATE = {
  currentUser: getUserFromSessionStorage() || null, // Load from localStorage  token: null,
  token: null,
};

export const signInWithEmailPassword = createAsyncThunk(
  "auth/signInWithEmailPassword",
  async ({ email, password }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { data, message } = await executeBasicAuthentication(
        email,
        password
      );

      dispatch(setSuccessMessage(message));
      dispatch(fetchSpentTypes());

      return data;
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiRegister(userData);

      dispatch(setSuccessMessage(message));
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    closeSession: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithEmailPassword.fulfilled, (state, action) => {
      const { name, email, token } = action.payload;
      const currentUser = {
        name: name,
        email: email,
      };

      state.currentUser = currentUser;
      state.token = token;
    });
  },
});

export const { closeSession } = authSlice.actions;

export default authSlice.reducer;
