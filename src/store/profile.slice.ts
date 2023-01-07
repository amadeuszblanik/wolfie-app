import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { AuthProfileGetResponse } from "../services/api/types/auth/profile/get/response.type";
import { AuthProfilePutResponse } from "../services/api/types/auth/profile/put/response.type";
import { AuthProfilePutPayload } from "../services/api/types/auth/profile/put/payload.type";
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

export interface ProfileStore {
  getStatus: ApiStatus;
  getError: string | null;
  data: AuthProfileGetResponse | null;
  putStatus: ApiStatus;
  putError: string | null;
}

const initialState: ProfileStore = {
  getStatus: "idle",
  getError: null,
  data: null,
  putStatus: "idle",
  putError: null,
};

export const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    resetPut: (state) => {
      state.putStatus = "idle";
      state.putError = null;
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
      state.data = null;
    });
    builder.addCase(put.fulfilled, (state, action) => {
      state.putStatus = "success";
      state.putError = null;
      state.data = action.payload;
    });
    builder.addCase(put.rejected, (state, action) => {
      state.putStatus = "error";
      state.putError = action.error.message || null;
      state.data = null;
    });
  },
});

export const selectProfileGetStatus = ({ profile }: AppState) => profile.getStatus;
export const selectProfileGetError = ({ profile }: AppState) => profile.getError;
export const selectProfilePutStatus = ({ profile }: AppState) => profile.putStatus;
export const selectProfilePutError = ({ profile }: AppState) => profile.putError;
export const selectProfileData = ({ profile }: AppState) => profile.data;

export const profileActions = {
  ...profileSlice.actions,
  get,
  put,
};
