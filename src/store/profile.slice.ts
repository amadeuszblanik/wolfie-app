import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { AuthProfileResponse } from "../services/api/types/auth/profile/get/response.type";

const get = createAsyncThunk<
  AuthProfileResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("profile/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.authProfile.get());

export interface ProfileStore {
  getStatus: ApiStatus;
  getError: string | null;
  data: AuthProfileResponse | null;
}

const initialState: ProfileStore = {
  getStatus: "idle",
  getError: null,
  data: null,
};

export const profileSlice = createSlice({
  name: "profile",

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
      state.getStatus = "pending";
      state.getError = null;
      state.data = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.getStatus = "success";
      state.getError = null;
      state.data = action.payload;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.getStatus = "error";
      state.getError = action.error.message || null;
      state.data = null;
    });
  },
});

export const selectProfileGetStatus = (state: { profile: ProfileStore }) => state.profile.getStatus;
export const selectProfileGetError = (state: { profile: ProfileStore }) => state.profile.getError;
export const selectProfileData = (state: { profile: ProfileStore }) => state.profile.data;

export const profileActions = {
  ...profileSlice.actions,
  get,
};
