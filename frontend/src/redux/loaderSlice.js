import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  show: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: INITIAL_STATE,
  reducers: {
    setLoaderActive: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setLoaderActive } = loaderSlice.actions;

export default loaderSlice.reducer;
