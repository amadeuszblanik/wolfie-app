import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { ConfigResponse } from "../services/api/types/config/response.type";

const get = createAsyncThunk<ConfigResponse, undefined, { extra: { apiService: ApiService }; rejectValue: ApiMessage }>(
  "config/get",
  async (_, thunkAPI) => await thunkAPI.extra.apiService.config(),
);

export interface ConfigStore {
  status: ApiStatus;
  error: string | null;
  data: ConfigResponse | null;
}

const initialState: ConfigStore = {
  status: "idle",
  error: null,
  data: null,
};

export const configSlice = createSlice({
  name: "config",

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

export const selectConfigStatus = (state: { config: ConfigStore }) => state.config.status;
export const selectConfigError = (state: { config: ConfigStore }) => state.config.error;
export const selectConfigData = (state: { config: ConfigStore }) => state.config.data;

export const configActions = {
  ...configSlice.actions,
  get,
};
