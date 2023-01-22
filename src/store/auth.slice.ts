import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AuthSignInPayload } from "../services/api/types/auth/sign-in/payload.type";
import { ApiStatus } from "../services/api/types/status.type";
import { AuthSignInResponse } from "../services/api/types/auth/sign-in/response.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { cookie } from "../utils";
import { AuthRefreshTokenPostResponse } from "../services/api/types/auth/refresh-token/post/response.type";
import { AuthRefreshTokenPostPayload } from "../services/api/types/auth/refresh-token/post/payload.type";
import { AppState } from "./index";

const signIn = createAsyncThunk<
  AuthSignInResponse,
  AuthSignInPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("auth/signIn", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authSignIn(payload));

const refreshSession = createAsyncThunk<
  AuthRefreshTokenPostResponse,
  AuthRefreshTokenPostPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("auth/refreshSession", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authRefreshToken.post(payload));

export interface AuthStore {
  status: ApiStatus;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  refreshSessionStatus: ApiStatus;
  refreshSessionError: string | null;
}

const initialState: AuthStore = {
  status: "idle",
  error: null,
  accessToken: null,
  refreshToken: null,
  refreshSessionStatus: "idle",
  refreshSessionError: null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    signOff: (state) => {
      state.status = "idle";
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;

      cookie.remove("accessToken", "/");
      cookie.remove("refreshToken", "/");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...action.payload.subject,
    }));
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;

      cookie.set("accessToken", action.payload.accessToken, { path: "/", expires: new Date("2100") });

      if (action.payload.refreshToken) {
        cookie.set("refreshToken", action.payload.refreshToken, { path: "/", expires: new Date("2100") });
      } else {
        cookie.remove("refreshToken", "/");
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.accessToken = null;
      state.refreshToken = null;

      cookie.remove("accessToken", "/");
      cookie.remove("refreshToken", "/");
    });
    builder.addCase(refreshSession.pending, (state) => {
      state.refreshSessionStatus = "pending";
      state.refreshSessionError = null;
      state.accessToken = null;
    });
    builder.addCase(refreshSession.fulfilled, (state, action) => {
      const refreshToken = action.payload.refreshToken || state.refreshToken || null;

      state.refreshSessionStatus = "success";
      state.refreshSessionError = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = refreshToken;

      cookie.set("accessToken", action.payload.accessToken, { path: "/", expires: new Date("2100") });

      if (refreshToken) {
        cookie.set("refreshToken", refreshToken, { path: "/", expires: new Date("2100") });
      } else {
        cookie.remove("refreshToken", "/");
      }
    });
    builder.addCase(refreshSession.rejected, (state, action) => {
      state.refreshSessionStatus = "error";
      state.refreshSessionError = action.error.message || null;
      state.accessToken = null;
      state.refreshToken = null;

      cookie.remove("accessToken", "/");
      cookie.remove("refreshToken", "/");
    });
  },
});

export const selectAuthStatus = ({ auth }: AppState) => auth.status;
export const selectAuthError = ({ auth }: AppState) => auth.error;
export const selectAuthAccessToken = ({ auth }: AppState) => auth.accessToken;
export const selectAuthRefreshToken = ({ auth }: AppState) => auth.refreshToken;
export const selectAuthRefreshSessionStatus = ({ auth }: AppState) => auth.refreshSessionStatus;
export const selectAuthRefreshSessionError = ({ auth }: AppState) => auth.refreshSessionError;

export const authActions = {
  ...authSlice.actions,
  signIn,
  refreshSession,
};
