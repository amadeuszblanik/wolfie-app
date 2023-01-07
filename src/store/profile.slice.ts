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
import { AuthDeleteAccountResponse } from "../services/api/types/auth/delete-account/response.type";
import { AuthDeleteAccountPayload } from "../services/api/types/auth/delete-account/payload.type";
import { AuthDeactivateAccountResponse } from "../services/api/types/auth/deactivate-account/response.type";
import { AuthDeactivateAccountPayload } from "../services/api/types/auth/deactivate-account/payload.type";
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

const deleteAccount = createAsyncThunk<
  AuthDeleteAccountResponse,
  AuthDeleteAccountPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("profile/delete-account", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authDeleteAccount(payload));

const deactivateAccount = createAsyncThunk<
  AuthDeactivateAccountResponse,
  AuthDeactivateAccountPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>(
  "profile/deactivate-account",
  async (payload, thunkAPI) => await thunkAPI.extra.apiService.authDeactivateAccount(payload),
);

export interface ProfileStore {
  getStatus: ApiStatus;
  getError: string | null;
  data: AuthProfileGetResponse | null;
  putStatus: ApiStatus;
  putError: string | null;
  changePasswordStatus: ApiStatus;
  changePasswordError: string | null;
  changePasswordData: AuthChangePasswordResponse | null;
  deleteAccountStatus: ApiStatus;
  deleteAccountError: string | null;
  deleteAccountData: AuthDeleteAccountResponse | null;
  deactivateAccountStatus: ApiStatus;
  deactivateAccountError: string | null;
  deactivateAccountData: AuthDeactivateAccountResponse | null;
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
  deleteAccountStatus: "idle",
  deleteAccountError: null,
  deleteAccountData: null,
  deactivateAccountStatus: "idle",
  deactivateAccountError: null,
  deactivateAccountData: null,
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
    builder.addCase(deleteAccount.pending, (state) => {
      state.deleteAccountStatus = "pending";
      state.deleteAccountError = null;
      state.deleteAccountData = null;
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.deleteAccountStatus = "success";
      state.deleteAccountError = null;
      state.deleteAccountData = action.payload;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.deleteAccountStatus = "error";
      state.deleteAccountError = action.error.message || null;
      state.deleteAccountData = null;
    });
    builder.addCase(deactivateAccount.pending, (state) => {
      state.deactivateAccountStatus = "pending";
      state.deactivateAccountError = null;
      state.deactivateAccountData = null;
    });
    builder.addCase(deactivateAccount.fulfilled, (state, action) => {
      state.deactivateAccountStatus = "success";
      state.deactivateAccountError = null;
      state.deactivateAccountData = action.payload;
    });
    builder.addCase(deactivateAccount.rejected, (state, action) => {
      state.deactivateAccountStatus = "error";
      state.deactivateAccountError = action.error.message || null;
      state.deactivateAccountData = null;
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
export const selectProfileDeleteAccountStatus = ({ profile }: AppState) => profile.deleteAccountStatus;
export const selectProfileDeleteAccountError = ({ profile }: AppState) => profile.deleteAccountError;
export const selectProfileDeleteAccountData = ({ profile }: AppState) => profile.deleteAccountData;
export const selectProfileDeactivateAccountStatus = ({ profile }: AppState) => profile.deactivateAccountStatus;
export const selectProfileDeactivateAccountError = ({ profile }: AppState) => profile.deactivateAccountError;
export const selectProfileDeactivateAccountData = ({ profile }: AppState) => profile.deactivateAccountData;

export const profileActions = {
  ...profileSlice.actions,
  get,
  put,
  changePassword,
  deleteAccount,
  deactivateAccount,
};
