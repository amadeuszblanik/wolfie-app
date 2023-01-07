import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { AuthProfileGetResponse } from "../services/api/types/auth/profile/get/response.type";
import { AuthProfilePutResponse } from "../services/api/types/auth/profile/put/response.type";
import { AuthProfilePutPayload } from "../services/api/types/auth/profile/put/payload.type";
import { AuthChangePasswordResponse } from "../services/api/types/auth/change-password/response.type";
import { AuthChangePasswordPayload } from "../services/api/types/auth/change-password/payload.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  AuthProfileGetResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("profile/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.authProfile.get());

const put = createAsyncThunk<
  AuthProfilePutResponse,
  AuthProfilePutPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("profile/put", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authProfile.put(payload));

const changePassword = createAsyncThunk<
  AuthChangePasswordResponse,
  AuthChangePasswordPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("profile/change-password", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authChangePassword(payload));

export interface ProfileStore {
  getStatus: ApiStatus;
  getError: string | null;
  data: AuthProfileGetResponse | null;
  putStatus: ApiStatus;
  putError: string | null;
  changePasswordStatus: ApiStatus;
  changePasswordError: string | null;
  changePasswordData: AuthChangePasswordResponse | null;
}

const initialState: ProfileStore = {
  getStatus: "idle",
  getError: null,
  data: null,
  putStatus: "idle",
  putError: null,
  changePasswordStatus: "idle",
  changePasswordError: null,
  changePasswordData: null,
};

export const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    resetPut: (state) => {
      state.putStatus = "idle";
      state.putError = null;
    },
    resetChangePassword: (state) => {
      state.changePasswordStatus = "idle";
      state.changePasswordError = null;
      state.changePasswordData = null;
    },
  },

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
    builder.addCase(put.pending, (state) => {
      state.putStatus = "pending";
      state.putError = null;
    });
    builder.addCase(put.fulfilled, (state, action) => {
      state.putStatus = "success";
      state.putError = null;
      state.data = action.payload;
    });
    builder.addCase(put.rejected, (state, action) => {
      state.putStatus = "error";
      state.putError = action.error.message || null;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.changePasswordStatus = "pending";
      state.changePasswordError = null;
      state.changePasswordData = null;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePasswordStatus = "success";
      state.changePasswordError = null;
      state.changePasswordData = action.payload;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.changePasswordStatus = "error";
      state.changePasswordError = action.error.message || null;
      state.changePasswordData = null;
    });
  },
});

export const selectProfileGetStatus = ({ profile }: AppState) => profile.getStatus;
export const selectProfileGetError = ({ profile }: AppState) => profile.getError;
export const selectProfilePutStatus = ({ profile }: AppState) => profile.putStatus;
export const selectProfilePutError = ({ profile }: AppState) => profile.putError;
export const selectProfileData = ({ profile }: AppState) => profile.data;
export const selectProfileChangePasswordStatus = ({ profile }: AppState) => profile.changePasswordStatus;
export const selectProfileChangePasswordError = ({ profile }: AppState) => profile.changePasswordError;
export const selectProfileChangePasswordData = ({ profile }: AppState) => profile.changePasswordData;

export const profileActions = {
  ...profileSlice.actions,
  get,
  put,
  changePassword,
};
