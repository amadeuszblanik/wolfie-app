import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { BreedResponse } from "../services/api/types/breed/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<BreedResponse, undefined, { extra: { apiService: ApiService }; rejectValue: ApiMessage }>(
  "breeds/get",
  async (_, thunkAPI) => await thunkAPI.extra.apiService.breed(),
);

export interface BreedsStore {
  status: ApiStatus;
  error: string | null;
  data: BreedResponse | null;
}

const initialState: BreedsStore = {
  status: "idle",
  error: null,
  data: null,
};

export const breedsSlice = createSlice({
  name: "breeds",

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

export const selectBreedsStatus = ({ breeds }: AppState) => breeds.status;
export const selectBreedsError = ({ breeds }: AppState) => breeds.error;
export const selectBreedsData = ({ breeds }: AppState) => breeds.data;
export const selectBreedsDataList = ({ breeds }: AppState) =>
  (breeds.data || []).map((breed) => ({
    key: Number(breed.id),
    label: String(breed.name),
  }));

export const breedsActions = {
  ...breedsSlice.actions,
  get,
};
