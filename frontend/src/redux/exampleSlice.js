import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoaderActive } from "./loaderSlice";
import {
  apiAddOrEditExample,
  apiDeleteExample,
  apiLoadAllExamples,
  apiLoadExampleById,
  apiLoadExamplesByDate,
  apiLoadExamplesByMonth,
  apiLoadExamplesByYear,
} from "../api/dashboard/example";
import { setErrorMessage, setSuccessMessage } from "./messageSlice";

const INITIAL_STATE = {
  exampleList: [],
  exampleListAll: [],
  exampleSelected: null,
  isOpenAddExampleModal: false,
};

export const loadAllExampleList = createAsyncThunk(
  "example/loadAllExampleList",
  async (_, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { data } = await apiLoadAllExamples();

      if (data?.length > 0) {
        dispatch(setSuccessMessage("Registros encontrados"));
      } else {
        dispatch(setErrorMessage("No existen registros"));
      }

      dispatch(
        loadAllExample({
          exampleListAll: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const loadExampleList = createAsyncThunk(
  "example/loadExampleList",
  async ({ filterType, date }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      let dataToShow = [];

      if (filterType === "date" && date) {
        const { data } = await apiLoadExamplesByDate(date);
        dataToShow = data;
      } else if (filterType === "month" && date) {
        const { data } = await apiLoadExamplesByMonth(date);
        dataToShow = data;
      } else if (filterType === "year" && date) {
        const { data } = await apiLoadExamplesByYear(date.getFullYear());
        dataToShow = data;
      } else {
        const { data } = await apiLoadAllExamples();
        dataToShow = data;
      }

      if (dataToShow?.length > 0) {
        dispatch(setSuccessMessage("Registros encontrados"));
      } else {
        dispatch(setErrorMessage("No existen registros"));
      }

      dispatch(
        loadExamples({
          exampleList: dataToShow,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const loadExampleById = createAsyncThunk(
  "example/loadExampleById",
  async ({ id }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { data } = await apiLoadExampleById(id);

      if (data) {
        dispatch(setSuccessMessage("Registro encontrado"));
        dispatch(
          loadExampleData({
            example: data,
          })
        );
      } else {
        dispatch(setErrorMessage("Registro no encontrado"));
      }
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const addExample = createAsyncThunk(
  "example/addExample",
  async (values, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiAddOrEditExample(values);

      if (values.resetForm) {
        values.resetForm();
      }

      dispatch(setAddExampleModal(false));
      dispatch(setSuccessMessage(message));

      const { data } = await apiLoadAllExamples();
      dispatch(
        loadExamples({
          exampleList: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const editExample = createAsyncThunk(
  "example/editExample",
  async (values, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiAddOrEditExample(values);

      if (values.resetForm) {
        values.resetForm();
      }

      dispatch(setAddExampleModal(false));
      dispatch(setSuccessMessage(message));

      const { data } = await apiLoadAllExamples();
      dispatch(
        loadExamples({
          exampleList: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

export const deleteExample = createAsyncThunk(
  "example/deleteExample",
  async ({ id, resetForm }, { dispatch }) => {
    dispatch(setLoaderActive(true));

    try {
      const { message } = await apiDeleteExample(id);

      if (resetForm) {
        resetForm();
      }

      dispatch(setAddExampleModal(false));
      dispatch(setSuccessMessage(message));

      const { data } = await apiLoadAllExamples();
      dispatch(
        loadExamples({
          exampleList: data,
        })
      );
    } catch (error) {
      dispatch(setErrorMessage(error));
    } finally {
      dispatch(setLoaderActive(false));
    }
  }
);

const exampleSlice = createSlice({
  name: "example",
  initialState: INITIAL_STATE,
  reducers: {
    loadAllExample: (state, action) => {
      if (action.payload?.exampleListAll) {
        state.exampleListAll = action.payload.exampleListAll;
      }
    },
    loadExamples: (state, action) => {
      if (action.payload?.exampleList) {
        state.exampleList = action.payload.exampleList;
      }
    },
    setAddExampleModal: (state, action) => {
      state.isOpenAddExampleModal = action.payload;
      if (action.payload === false) {
        state.exampleSelected = INITIAL_STATE.exampleSelected;
      }
    },
    loadExampleData: (state, action) => {
      if (action.payload?.example) {
        state.exampleSelected = action.payload.example;
      }
    },
    clearExampleSelected: (state) => {
      state.exampleSelected = INITIAL_STATE.exampleSelected;
    },
  },
});

export const {
  loadAllExample,
  loadExamples,
  setAddExampleModal,
  loadExampleData,
  clearExampleSelected,
} = exampleSlice.actions;

export default exampleSlice.reducer;
