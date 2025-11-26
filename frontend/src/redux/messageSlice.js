import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  showErrorMessage: false,
  showSuccessMessage: false,
  message: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState: INITIAL_STATE,
  reducers: {
    setErrorMessage: (state, action) => {
      state.message = INITIAL_STATE.message;
      state.showErrorMessage = true;
      state.showSuccessMessage = false;

      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.message = action.payload;
      }
    },
    setSuccessMessage: (state, action) => {
      state.message = INITIAL_STATE.message;
      state.showErrorMessage = false;
      state.showSuccessMessage = true;
      state.message = action.payload;
    },
    clearMessages: (state) => {
      state.showErrorMessage = INITIAL_STATE.showErrorMessage;
      state.showSuccessMessage = INITIAL_STATE.showSuccessMessage;
      state.message = INITIAL_STATE.message;
    },
  },
});

export const { setErrorMessage, setSuccessMessage, clearMessages } =
  messageSlice.actions;

export default messageSlice.reducer;
