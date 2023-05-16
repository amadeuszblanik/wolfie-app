import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { AuthSignUpResponse } from "../services/api/types/auth/sign-up/response.type";
import { AuthSignUpPayload } from "../services/api/types/auth/sign-up/payload.type";

const signUp = createAsyncThunk<
  AuthSignUpResponse,
  AuthSignUpPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("signUp/signUp", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authSignUp(payload));

export interface SignUpStore {
  status: ApiStatus;
  error: string | null;
  message: string | null;
}

const initialState: SignUpStore = {
  status: "idle",
  error: null,
  message: null,
};

export const signUpSlice = createSlice({
  name: "signUp",

  initialState,

  reducers: {
    resetForm: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...action.payload.subject,
    }));
    builder.addCase(signUp.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.message = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.message = action.payload.message;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.message = null;
    });
  },
});

export const selectSignUpStatus = (state: { signUp: SignUpStore }) => state.signUp.status;
export const selectSignUpError = (state: { signUp: SignUpStore }) => state.signUp.error;
export const selectSignUpMessage = (state: { signUp: SignUpStore }) => state.signUp.message;

export const signUpActions = {
  ...signUpSlice.actions,
  signUp,
};
