import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { GenericMessageApi } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { AuthChangePasswordResponse } from "../services/api/types/auth/change-password/response.type";
import { AuthChangePasswordPayload } from "../services/api/types/auth/change-password/payload.type";
import { AuthDeleteAccountResponse } from "../services/api/types/auth/delete-account/response.type";
import { AuthDeleteAccountPayload } from "../services/api/types/auth/delete-account/payload.type";
import { AuthDeactivateAccountResponse } from "../services/api/types/auth/deactivate-account/response.type";
import { AuthDeactivateAccountPayload } from "../services/api/types/auth/deactivate-account/payload.type";
import { ProfileUpdateApi } from "../services/api/types/profile-update.type";
import { UserApi } from "../services/api/user.type";
import { AppState } from "./index";

const get = createAsyncThunk<UserApi, undefined, { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }>(
  "profile/get",
  async (_, thunkAPI) => await thunkAPI.extra.apiService.authProfile.get(),
);

const patch = createAsyncThunk<
  GenericMessageApi,
  ProfileUpdateApi,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("profile/patch", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authProfile.patch(payload));

const changePassword = createAsyncThunk<
  AuthChangePasswordResponse,
  AuthChangePasswordPayload,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("profile/change-password", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authChangePassword(payload));

const deleteAccount = createAsyncThunk<
  AuthDeleteAccountResponse,
  AuthDeleteAccountPayload,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("profile/delete-account", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authDeleteAccount(payload));

const deactivateAccount = createAsyncThunk<
  AuthDeactivateAccountResponse,
  AuthDeactivateAccountPayload,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "profile/deactivate-account",
  async (payload, thunkAPI) => await thunkAPI.extra.apiService.authDeactivateAccount(payload),
);

export interface ProfileStore {
  getStatus: ApiStatus;
  getError: string | null;
  data: UserApi | null;
  patchData: GenericMessageApi | null;
  patchStatus: ApiStatus;
  patchError: string | null;
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
  patchData: null,
  patchStatus: "idle",
  patchError: null,
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
    resetPatch: (state) => {
      state.patchStatus = "idle";
      state.patchError = null;
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
    builder.addCase(patch.pending, (state) => {
      state.patchStatus = "pending";
      state.patchError = null;
    });
    builder.addCase(patch.fulfilled, (state, action) => {
      state.patchStatus = "success";
      state.patchData = action.payload;
      state.patchError = null;
    });
    builder.addCase(patch.rejected, (state, action) => {
      state.patchStatus = "error";
      state.patchError = action.error.message || null;
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
export const selectProfilepatchStatus = ({ profile }: AppState) => profile.patchStatus;
export const selectProfilepatchError = ({ profile }: AppState) => profile.patchError;
export const selectProfileData = ({ profile }: AppState) => profile.data;
export const selectProfileChangePasswordStatus = ({ profile }: AppState) => profile.changePasswordStatus;
export const selectProfileChangePasswordError = ({ profile }: AppState) => profile.changePasswordError;
export const selectProfileChangePasswordData = ({ profile }: AppState) => profile.changePasswordData;
export const selectProfileChangePasswordMessage = ({ profile }: AppState) => profile.changePasswordData?.message;
export const selectProfileDeleteAccountStatus = ({ profile }: AppState) => profile.deleteAccountStatus;
export const selectProfileDeleteAccountError = ({ profile }: AppState) => profile.deleteAccountError;
export const selectProfileDeleteAccountData = ({ profile }: AppState) => profile.deleteAccountData;
export const selectProfileDeactivateAccountStatus = ({ profile }: AppState) => profile.deactivateAccountStatus;
export const selectProfileDeactivateAccountError = ({ profile }: AppState) => profile.deactivateAccountError;
export const selectProfileDeactivateAccountData = ({ profile }: AppState) => profile.deactivateAccountData;

export const profileActions = {
  ...profileSlice.actions,
  get,
  patch,
  changePassword,
  deleteAccount,
  deactivateAccount,
};
