import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { AuthRefreshTokenGetResponse } from "../services/api/types/auth/refresh-token/get/response.type";
import { AuthRefreshTokenPostResponse } from "../services/api/types/auth/refresh-token/post/response.type";
import { AuthRefreshTokenPostPayload } from "../services/api/types/auth/refresh-token/post/payload.type";
import { AuthRefreshTokenDeleteResponse } from "../services/api/types/auth/refresh-token/delete/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  AuthRefreshTokenGetResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("refreshToken/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.authRefreshToken.get());

const post = createAsyncThunk<
  AuthRefreshTokenPostResponse,
  AuthRefreshTokenPostPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("refreshToken/post", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authRefreshToken.post(payload));

const remove = createAsyncThunk<
  AuthRefreshTokenDeleteResponse,
  { refreshTokenId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>(
  "refreshToken/remove",
  async ({ refreshTokenId }, thunkAPI) => await thunkAPI.extra.apiService.authRefreshToken.delete(refreshTokenId),
);

export interface RefreshTokenStore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: AuthRefreshTokenGetResponse | null;
  postStatus: ApiStatus;
  postError: string | null;
  postData: AuthRefreshTokenPostResponse | null;
  removeStatus: ApiStatus;
  removeError: string | null;
  removeData: AuthRefreshTokenDeleteResponse | null;
}

const initialState: RefreshTokenStore = {
  getStatus: "idle",
  getError: null,
  getData: null,
  postStatus: "idle",
  postError: null,
  postData: null,
  removeStatus: "idle",
  removeError: null,
  removeData: null,
};

export const refreshTokenSlice = createSlice({
  name: "refreshToken",

  initialState,

  reducers: {
    resetPost: (state) => {
      state.postStatus = "idle";
      state.postError = null;
      state.postData = null;
    },
    resetDelete: (state) => {
      state.postStatus = "idle";
      state.postError = null;
      state.postData = null;
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
    builder.addCase(post.pending, (state) => {
      state.postStatus = "pending";
      state.postError = null;
      state.postData = null;
    });
    builder.addCase(post.fulfilled, (state, action) => {
      state.postStatus = "success";
      state.postError = null;
      state.postData = action.payload;
    });
    builder.addCase(post.rejected, (state, action) => {
      state.postStatus = "error";
      state.postError = action.error.message || null;
      state.postData = null;
    });
    builder.addCase(remove.pending, (state) => {
      state.removeStatus = "pending";
      state.removeError = null;
      state.removeData = null;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      state.removeStatus = "success";
      state.removeError = null;
      state.removeData = action.payload;
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.removeStatus = "error";
      state.removeError = action.error.message || null;
      state.removeData = null;
    });
  },
});

export const selectRefreshTokenGetStatus = ({ refreshToken }: AppState) => refreshToken.getStatus;
export const selectRefreshTokenGetError = ({ refreshToken }: AppState) => refreshToken.getError;
export const selectRefreshTokenGetData = ({ refreshToken }: AppState) => refreshToken.getData;
export const selectRefreshTokenPostStatus = ({ refreshToken }: AppState) => refreshToken.postStatus;
export const selectRefreshTokenPostError = ({ refreshToken }: AppState) => refreshToken.postError;
export const selectRefreshTokenPostData = ({ refreshToken }: AppState) => refreshToken.postData;
export const selectRefreshTokenRemoveStatus = ({ refreshToken }: AppState) => refreshToken.removeStatus;
export const selectRefreshTokenRemoveError = ({ refreshToken }: AppState) => refreshToken.removeError;
export const selectRefreshTokenRemoveData = ({ refreshToken }: AppState) => refreshToken.removeData;

export const refreshTokenActions = {
  ...refreshTokenSlice.actions,
  get,
  post,
  remove,
};
