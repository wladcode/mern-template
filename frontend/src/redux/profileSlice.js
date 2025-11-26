import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddCatalogType,
  apiLoadSpentsCatalog,
} from "../api/dashboard/catalog";
import { setLoaderActive } from "./loaderSlice";
import { setErrorMessage, setSuccessMessage } from "./messageSlice";
import { orderByName } from "@utils/spents";

// Async thunk to fetch spentTypes data
export const fetchSpentTypes = createAsyncThunk(
  "profileUser/fetchSpentTypes",
  async (data, { dispatch }) => {
    try {
      const responseCatalogs = await apiLoadSpentsCatalog(data);
      return responseCatalogs.data?.items || [];
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

// Async thunk to fetch spentTypes data
export const addSpentType = createAsyncThunk(
  "profileUser/addSpentType",
  async ({ spentTypes }, { dispatch }) => {
    dispatch(setLoaderActive(true));
    try {
      const { data, message } = await apiAddCatalogType("spents", spentTypes);
      dispatch(setSuccessMessage(message));
      return data?.items || [];
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

const profileUserSlice = createSlice({
  name: "profileUser",
  initialState: {
    spentTypes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpentTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.spentTypes = orderByName(action.payload);
      }
    });
    builder.addCase(addSpentType.fulfilled, (state, action) => {
      if (action.payload) {
        state.spentTypes = orderByName(action.payload);
      }
    });
  },
});

export default profileUserSlice.reducer;
