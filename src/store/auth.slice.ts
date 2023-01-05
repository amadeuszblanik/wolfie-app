import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AuthSignInPayload } from "../services/api/types/auth/sign-in/payload.type";
import { ApiStatus } from "../services/api/types/status.type";
import { AuthSignInResponse } from "../services/api/types/auth/sign-in/response.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { cookie } from "../utils";

const signIn = createAsyncThunk<
  AuthSignInResponse,
  AuthSignInPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("auth/signIn", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authSignIn(payload));

export interface AuthStore {
  status: ApiStatus;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthStore = {
  status: "idle",
  error: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

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
        cookie.remove("refreshToken");
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.accessToken = null;
      state.refreshToken = null;

      cookie.remove("accessToken");
      cookie.remove("refreshToken");
    });
  },
});

export const selectAuthStatus = (state: { auth: AuthStore }) => state.auth.status;
export const selectAuthError = (state: { auth: AuthStore }) => state.auth.error;
export const selectAuthAccessToken = (state: { auth: AuthStore }) => state.auth.accessToken;
export const selectAuthRefreshToken = (state: { auth: AuthStore }) => state.auth.refreshToken;

export const authActions = {
  ...authSlice.actions,
  signIn,
};
