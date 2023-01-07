import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { configSlice } from "./config.slice";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { AuthConfirmEmailResponse } from "../services/api/types/auth/confirm-email/response.type";
import { AuthConfirmEmailPayload } from "../services/api/types/auth/confirm-email/payload.type";
import { AppState } from "./index";

const post = createAsyncThunk<
  AuthConfirmEmailResponse,
  AuthConfirmEmailPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("confirmEmail/post", async (payload, thunkAPI) => await thunkAPI.extra.apiService.authConfirmEmail(payload));

export interface ConfirmEmailStore {
  status: ApiStatus;
  error: string | null;
  data: AuthConfirmEmailResponse | null;
}

const initialState: ConfirmEmailStore = {
  status: "idle",
  error: null,
  data: null,
};

export const confirmEmailSlice = createSlice({
  name: "confirmEmail",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...action.payload.subject,
    }));
    builder.addCase(post.pending, (state) => {
      state.status = "pending";
      state.error = null;
      state.data = null;
    });
    builder.addCase(post.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(post.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.data = null;
    });
  },
});

export const selectConfirmEmailPostStatus = ({ confirmEmail }: AppState) => confirmEmail.status;
export const selectConfirmEmailPostError = ({ confirmEmail }: AppState) => confirmEmail.error;
export const selectConfirmEmailPostData = ({ confirmEmail }: AppState) => confirmEmail.data;

export const confirmEmailActions = {
  ...configSlice.actions,
  post,
};
