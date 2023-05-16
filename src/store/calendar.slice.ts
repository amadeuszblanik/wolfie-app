import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { CalendarResponse } from "../services/api/types/calendar/response.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  CalendarResponse,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("calendar/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.calendar());

export interface CalendarStore {
  status: ApiStatus;
  error: string | null;
  data: CalendarResponse | null;
}

const initialState: CalendarStore = {
  status: "idle",
  error: null,
  data: null,
};

export const calendarSlice = createSlice({
  name: "calendar",

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

export const selectCalendarStatus = ({ calendar }: AppState) => calendar.status;
export const selectCalendarError = ({ calendar }: AppState) => calendar.error;
export const selectCalendarData = ({ calendar }: AppState) => calendar.data;

export const calendarActions = {
  ...calendarSlice.actions,
  get,
};
