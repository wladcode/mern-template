import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoaderActive } from "./loaderSlice";
import {
  apiAddOrEditSpent,
  apiDeleteSpent,
  apiLoadSpents,
  apiLoadSpentsByMonth,
  apiLoadSpentsByYear,
} from "../api/dashboard/spent";
import { setErrorMessage, setSuccessMessage } from "./messageSlice";
import { addDays, startOfDay, subDays } from "date-fns";
import { minusRefunds } from "@utils/spents";

const INITIAL_STATE = {
  types: [],
  spentListAll: [],
  spentList: [],
  isOpenAddSpentModal: false,
  spentTypeSelected: null,
  spentSelected: null,
  currentDate: startOfDay(new Date()).toISOString(), // Store as ISO string
};

export const loadAllSpentList = createAsyncThunk(
  "spent/loadAllSpentList",
  async ({ byType }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { data } = await apiLoadSpentsByYear();

      if (data?.length > 0) {
        dispatch(setSuccessMessage("Registros encontrados"));
      } else {
        dispatch(setErrorMessage("No existen registros"));
      }

      dispatch(
        loadAllSpent({
          spentListAll: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const loadSpentsList = createAsyncThunk(
  "spent/loadSpentsList",
  async ({ currentDate, byType }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      let dataToShow = [];
      if (byType === "month") {
        const { data } = await apiLoadSpentsByMonth(currentDate);
        dataToShow = data;
      } else if (byType === "year") {
        const { data } = await apiLoadSpentsByYear();
        dataToShow = data;
      } else {
        const { data } = await apiLoadSpents(currentDate);
        dataToShow = data;
      }

      if (dataToShow?.length > 0) {
        dispatch(setSuccessMessage("Registros encontrados"));
      } else {
        dispatch(setErrorMessage("No existen registros"));
      }

      dispatch(
        loadSpents({
          spentList: dataToShow,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const addSpent = createAsyncThunk(
  "spent/addSpent",
  async (values, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiAddOrEditSpent(values);

      values.resetForm();
      dispatch(setAddSpentModal(false));
      dispatch(setSuccessMessage(message));

      const currentDate = values.date;

      const { data } = await apiLoadSpents(currentDate);
      dispatch(
        loadSpents({
          spentList: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const deleteSpent = createAsyncThunk(
  "spent/deleteSpent",
  async ({ id, currentDate, resetForm }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiDeleteSpent(id);

      resetForm();
      dispatch(setAddSpentModal(false));
      dispatch(setSuccessMessage(message));

      const { data } = await apiLoadSpents(currentDate);

      dispatch(
        loadSpents({
          spentList: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

const spentSlice = createSlice({
  name: "spent",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    addDay: (state) => {
      state.currentDate = addDays(new Date(state.currentDate), 1).toISOString(); // Add one day
    },
    subtractDay: (state) => {
      state.currentDate = subDays(new Date(state.currentDate), 1).toISOString(); // Subtract one day
    },
    loadAllSpent: (state, action) => {
      if (action.payload?.spentListAll) {
        state.spentListAll = minusRefunds(action.payload.spentListAll);
      }
    },
    loadSpents: (state, action) => {
      if (action.payload?.spentList) {
        state.spentList = minusRefunds(action.payload.spentList);
      }
    },
    setAddSpentModal: (state, action) => {
      state.isOpenAddSpentModal = action.payload;
      if (action.payload === false) {
        state.spentTypeSelected = INITIAL_STATE.spentTypeSelected;
        state.spentSelected = INITIAL_STATE.spentSelected;
      }
    },
    setSpentTypeSelected: (state, action) => {
      state.spentTypeSelected = action.payload;
      state.spentSelected = INITIAL_STATE.spentSelected;
    },
    loadSpentData: (state, action) => {
      state.spentTypeSelected = INITIAL_STATE.spentTypeSelected;
      let spentData = action.payload;
      if (spentData.isRefund) {
        spentData = { ...spentData, amount: spentData.amount * -1 };
      }
      state.spentSelected = spentData;
    },
  },
});

export const {
  setCurrentDate,
  addDay,
  subtractDay,
  loadSpents,
  setAddSpentModal,
  setSpentTypeSelected,
  loadSpentData,
  loadAllSpent,
} = spentSlice.actions;

export default spentSlice.reducer;
