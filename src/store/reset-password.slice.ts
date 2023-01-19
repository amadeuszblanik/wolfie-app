import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { AuthResetPasswordGetPayload } from "../services/api/types/auth/reset-password/get/response.type";
import { AuthResetPasswordPutResponse } from "../services/api/types/auth/reset-password/put/response.type";
import { AuthResetPasswordPutPayload } from "../services/api/types/auth/reset-password/put/payload.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  AuthResetPasswordGetPayload,
  { userEmail: string },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>(
  "resetPassword/get",
  async ({ userEmail }, thunkAPI) => await thunkAPI.extra.apiService.authResetPassword.get(userEmail),
);

const put = createAsyncThunk<
  AuthResetPasswordPutResponse,
  AuthResetPasswordPutPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("resetPassword/post", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authResetPassword.put(payload));

export interface ResetPasswordStore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: AuthResetPasswordGetPayload | null;
  putStatus: ApiStatus;
  putError: string | null;
  putData: AuthResetPasswordPutResponse | null;
}

const initialState: ResetPasswordStore = {
  getStatus: "idle",
  getError: null,
  getData: null,
  putStatus: "idle",
  putError: null,
  putData: null,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",

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
      state.getData = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.getStatus = "success";
      state.getError = null;
      state.getData = action.payload;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.getStatus = "error";
      state.getError = action.error.message || null;
      state.getData = null;
    });
    builder.addCase(put.pending, (state) => {
      state.putStatus = "pending";
      state.putError = null;
      state.putData = null;
    });
    builder.addCase(put.fulfilled, (state, action) => {
      state.putStatus = "success";
      state.putError = null;
      state.putData = action.payload;
    });
    builder.addCase(put.rejected, (state, action) => {
      state.putStatus = "error";
      state.putError = action.error.message || null;
      state.putData = null;
    });
  },
});

export const selectResetPasswordGetStatus = ({ resetPassword }: AppState) => resetPassword.getStatus;
export const selectResetPasswordGetError = ({ resetPassword }: AppState) => resetPassword.getError;
export const selectResetPasswordGetData = ({ resetPassword }: AppState) => resetPassword.getData;

export const selectResetPasswordPutStatus = ({ resetPassword }: AppState) => resetPassword.putStatus;
export const selectResetPasswordPutError = ({ resetPassword }: AppState) => resetPassword.putError;
export const selectResetPasswordPutData = ({ resetPassword }: AppState) => resetPassword.putData;

export const resetPasswordActions = {
  ...resetPasswordSlice.actions,
  get,
  put,
};
