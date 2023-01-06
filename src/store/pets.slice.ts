import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { PetsMyResponse } from "../services/api/types/pets/my/response.type";

const petsMy = createAsyncThunk<
  PetsMyResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("pets/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.petsMy());

export interface PetsStore {
  myStatus: ApiStatus;
  myError: string | null;
  data: PetsMyResponse | null;
}

const initialState: PetsStore = {
  myStatus: "idle",
  myError: null,
  data: null,
};

export const petsSlice = createSlice({
  name: "pets",

  initialState,

  reducers: {},

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
  },
});

export const selectPetsMyStatus = (state: { pets: PetsStore }) => state.pets.myStatus;
export const selectPetsMyError = (state: { pets: PetsStore }) => state.pets.myError;
export const selectPetsMy = (state: { pets: PetsStore }) => state.pets.data;
export const selectPets = (id: string) => (state: { pets: PetsStore }) => state.pets.data?.find((pet) => pet.id === id);

export const petsActions = {
  ...petsSlice.actions,
  petsMy,
};
