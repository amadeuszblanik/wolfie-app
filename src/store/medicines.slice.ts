import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SelectItem } from "bme-ui/dist/atoms/select-deperacated/types";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { MedicineShortResponse } from "../services/api/types/medicine/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  MedicineShortResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("medicines/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.medicine());

export interface MedicinesStore {
  status: ApiStatus;
  error: string | null;
  data: MedicineShortResponse | null;
}

const initialState: MedicinesStore = {
  status: "idle",
  error: null,
  data: null,
};

export const medicinesSlice = createSlice({
  name: "medicines",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...action.payload.subject,
    }));
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.data = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.data = null;
    });
  },
});

export const selectMedicinesStatus = ({ medicines }: AppState) => medicines.status;
export const selectMedicinesError = ({ medicines }: AppState) => medicines.error;
export const selectMedicinesData = ({ medicines }: AppState) => medicines.data;
export const selectMedicinesDataAsList = ({ medicines }: AppState): SelectItem[] =>
  medicines.data?.map((medicine) => ({
    key: medicine.productNumber,
    label: medicine.name,
  })) || [];

export const medicinesActions = {
  ...medicinesSlice.actions,
  get,
};
