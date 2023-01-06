import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { PetsPetIdWeightGetResponse } from "../services/api/types/pets/:petId/weight/get/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  PetsPetIdWeightGetResponse,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("petsWeight/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.get(petId));

export interface PetsWeightStore {
  status: ApiStatus;
  error: string | null;
  data: PetsPetIdWeightGetResponse | null;
}

const initialState: PetsWeightStore = {
  status: "idle",
  error: null,
  data: null,
};

export const petsWeightsSlice = createSlice({
  name: "petsWeights",

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

export const selectPetsWeightStatus = ({ petsWeights }: AppState) => petsWeights.status;
export const selectPetsWeightError = ({ petsWeights }: AppState) => petsWeights.error;
export const selectPetsWeightData = ({ petsWeights }: AppState) => petsWeights.data;
export const selectPetsWeightDataById =
  (id: string) =>
  ({ petsWeights }: AppState) =>
    petsWeights.data?.find((pet) => pet.id === id);

export const petsWeightActions = {
  ...petsWeightsSlice.actions,
  get,
};
