import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { PetsMyResponse } from "../services/api/types/pets/my/response.type";
import { PetsAddResponse } from "../services/api/types/pets/add/response.type";
import { PetsAddPayload } from "../services/api/types/pets/add/payload.type";
import { AppState } from "./index";

const petsMy = createAsyncThunk<
  PetsMyResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("pets/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.petsMy());

const add = createAsyncThunk<
  PetsAddResponse,
  PetsAddPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("pets/add", async (payload, thunkAPI) => await thunkAPI.extra.apiService.petsAdd.post(payload));

export interface PetsStore {
  myStatus: ApiStatus;
  myError: string | null;
  data: PetsMyResponse | null;
  addStatus: ApiStatus;
  addError: string | null;
}

const initialState: PetsStore = {
  myStatus: "idle",
  myError: null,
  data: null,
  addStatus: "idle",
  addError: null,
};

export const petsSlice = createSlice({
  name: "pets",

  initialState,

  reducers: {
    resetAdd: (state) => {
      state.addStatus = "idle";
      state.addError = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...action.payload.subject,
    }));
    builder.addCase(petsMy.pending, (state) => {
      state.myStatus = "pending";
      state.myError = null;
      state.data = null;
    });
    builder.addCase(petsMy.fulfilled, (state, action) => {
      state.myStatus = "success";
      state.myError = null;
      state.data = action.payload;
    });
    builder.addCase(petsMy.rejected, (state, action) => {
      state.myStatus = "error";
      state.myError = action.error.message || null;
      state.data = null;
    });
    builder.addCase(add.pending, (state) => {
      state.myStatus = "pending";
      state.myError = null;
      state.data = null;
    });
    builder.addCase(add.fulfilled, (state, action) => {
      state.addStatus = "success";
      state.addError = null;
      state.data = [...(state.data || []), action.payload];
    });
    builder.addCase(add.rejected, (state, action) => {
      state.addStatus = "error";
      state.addError = action.error.message || null;
    });
  },
});

export const selectPetsMyStatus = ({ pets }: AppState) => pets.myStatus;
export const selectPetsMyError = ({ pets }: AppState) => pets.myError;
export const selectPetsMy = ({ pets }: AppState) => pets.data;
export const selectPets =
  (id: string) =>
  ({ pets }: AppState) =>
    pets.data?.find((pet) => pet.id === id);
export const selectPetsAddStatus = ({ pets }: AppState) => pets.addStatus;
export const selectPetsAddError = ({ pets }: AppState) => pets.addError;

export const petsActions = {
  ...petsSlice.actions,
  petsMy,
  add,
};
