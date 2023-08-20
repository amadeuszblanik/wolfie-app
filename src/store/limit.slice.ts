import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { GenericMessageApi } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { AuthLimitApi } from "../services/api/types/auth-limit.type";

const get = createAsyncThunk<
  AuthLimitApi,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("limit/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.authLimit.get());

export interface LimitStore {
  status: ApiStatus;
  error: string | null;
  data: AuthLimitApi | null;
}

const initialState: LimitStore = {
  status: "idle",
  error: null,
  data: null,
};

export const limitSlice = createSlice({
  name: "limit",

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
      state.status = "pending";
      state.error = null;
      state.data = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || null;
      state.data = null;
    });
  },
});

export const selectLimitStatus = (state: { limit: LimitStore }) => state.limit.status;
export const selectLimitError = (state: { limit: LimitStore }) => state.limit.error;
export const selectLimitData = (state: { limit: LimitStore }) => state.limit.data;

export const limitActions = {
  ...limitSlice.actions,
  get,
};
