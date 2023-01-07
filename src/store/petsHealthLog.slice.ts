import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { PetsPetIdHealthLogGetResponse } from "../services/api/types/pets/:petId/health-log/get/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  PetsPetIdHealthLogGetResponse,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("petsHealthLog/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.get(petId));

export interface PetsHealthLogtore {
  status: ApiStatus;
  error: string | null;
  data: PetsPetIdHealthLogGetResponse | null;
}

const initialState: PetsHealthLogtore = {
  status: "idle",
  error: null,
  data: null,
};

export const petsHealthLogSlice = createSlice({
  name: "petsHealthLog",

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

export const selectPetsHealthLogStatus = ({ petsHealthLog }: AppState) => petsHealthLog.status;
export const selectPetsHealthLogError = ({ petsHealthLog }: AppState) => petsHealthLog.error;
export const selectPetsHealthLogData = ({ petsHealthLog }: AppState) => petsHealthLog.data;
export const selectPetsHealthLogDataById =
  (id: string) =>
  ({ petsHealthLog }: AppState) =>
    petsHealthLog.data?.find((pet) => pet.id === id);

export const petsHealthLogActions = {
  ...petsHealthLogSlice.actions,
  get,
};
