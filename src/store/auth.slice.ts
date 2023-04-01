import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AuthSignInPayload } from "../services/api/types/auth/sign-in/payload.type";
import { ApiStatus } from "../services/api/types/status.type";
import { AuthSignInResponse } from "../services/api/types/auth/sign-in/response.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { cookie } from "../utils";
import { AuthApplePayload } from "../services/api/types/auth/apple/payload.type";
import { AuthAppleResponse } from "../services/api/types/auth/apple/response.type";
import { AppState } from "./index";

const signIn = createAsyncThunk<
  AuthSignInResponse,
  AuthSignInPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("auth/signIn", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authSignIn(payload));

const signInApple = createAsyncThunk<
  AuthAppleResponse,
  AuthApplePayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("auth/signInApple", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authApple(payload));

export interface AuthStore {
  status: ApiStatus;
  appleStatus: ApiStatus;
  error: string | null;
  appleError: string | null;
}

const initialState: AuthStore = {
  status: "idle",
  appleStatus: "idle",
  error: null,
  appleError: null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    resetForm: (state) => {
      state.status = "idle";
      state.error = null;
    },
    signOff: (state) => {
      state.status = "idle";
      state.error = null;

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
    });
    builder.addCase(signIn.fulfilled, (state, { payload: { accessToken, refreshToken } }) => {
      state.status = "success";
      state.error = null;

      cookie.set("accessToken", accessToken, { path: "/", expires: new Date("2100") });

      if (refreshToken) {
        cookie.set("refreshToken", refreshToken, { path: "/", expires: new Date("2100") });
      } else {
        cookie.remove("refreshToken", "/");
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;

      cookie.remove("accessToken", "/");
      cookie.remove("refreshToken", "/");
    });
    builder.addCase(signInApple.pending, (state) => {
      state.appleStatus = "pending";
      state.appleError = null;
    });
    builder.addCase(signInApple.fulfilled, (state, { payload: { accessToken, refreshToken } }) => {
      state.appleStatus = "success";
      state.appleError = null;

      cookie.set("accessToken", accessToken, { path: "/", expires: new Date("2100") });

      if (refreshToken) {
        cookie.set("refreshToken", refreshToken, { path: "/", expires: new Date("2100") });
      } else {
        cookie.remove("refreshToken", "/");
      }
    });
    builder.addCase(signInApple.rejected, (state, action) => {
      state.appleStatus = "error";
      state.appleError = action.error.message || null;

      cookie.remove("accessToken", "/");
      cookie.remove("refreshToken", "/");
    });
  },
});

export const selectAuthStatus = ({ auth }: AppState) => auth.status;
export const selectAuthAppleStatus = ({ auth }: AppState) => auth.appleStatus;
export const selectAuthError = ({ auth }: AppState) => auth.error;
export const selectAuthAppleError = ({ auth }: AppState) => auth.appleError;

export const authActions = {
  ...authSlice.actions,
  signIn,
  signInApple,
};
