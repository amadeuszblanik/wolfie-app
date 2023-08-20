import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { GenericMessageApi } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { ResultsListApi } from "../services/api/types/results-list.type";
import { HealthLogApi } from "../services/api/types/health-log.type";
import { HealthLogCreateApi } from "../services/api/types/health-log-create.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  ResultsListApi<HealthLogApi>,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("petsHealthLog/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.get(petId));

const post = createAsyncThunk<
  GenericMessageApi,
  { petId: string; payload: HealthLogCreateApi },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsHealthLog/post",
  async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.post(petId, payload),
);

const patch = createAsyncThunk<
  GenericMessageApi,
  { petId: string; healthLogId: string; payload: HealthLogCreateApi },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsHealthLog/patch",
  async ({ petId, healthLogId, payload }, thunkAPI) =>
    await thunkAPI.extra.apiService.petsHealthLog.patch(petId, healthLogId, payload),
);

const remove = createAsyncThunk<
  GenericMessageApi,
  { petId: string; healthLogId: string },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsHealthLog/delete",
  async ({ petId, healthLogId }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.delete(petId, healthLogId),
);

export interface PetsHealthLogStore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: HealthLogApi[] | null;
  postStatus: ApiStatus;
  postError: string | null;
  postData: GenericMessageApi | null;
  patchStatus: ApiStatus;
  patchError: string | null;
  patchData: GenericMessageApi | null;
  deleteStatus: ApiStatus;
  deleteError: string | null;
  deleteData: string | null;
}

const initialState: PetsHealthLogStore = {
  getStatus: "idle",
  getError: null,
  getData: null,
  postStatus: "idle",
  postError: null,
  postData: null,
  patchStatus: "idle",
  patchError: null,
  patchData: null,
  deleteStatus: "idle",
  deleteError: null,
  deleteData: null,
};

export const petsHealthLogSlice = createSlice({
  name: "petsHealthLog",

  initialState,

  reducers: {
    resetPost: (state) => {
      state.postStatus = "idle";
      state.postError = null;
      state.postData = null;
    },
    resetPatch: (state) => {
      state.patchStatus = "idle";
      state.patchError = null;
      state.patchData = null;
    },
    resetDelete: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
      state.deleteData = null;
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
      state.getData = action.payload.results;
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
    builder.addCase(patch.pending, (state) => {
      state.patchStatus = "pending";
      state.patchError = null;
      state.patchData = null;
    });
    builder.addCase(patch.fulfilled, (state, action) => {
      state.patchStatus = "success";
      state.patchError = null;
      state.patchData = action.payload;
    });
    builder.addCase(patch.rejected, (state, action) => {
      state.patchStatus = "error";
      state.patchError = action.error.message || null;
      state.patchData = null;
    });
    builder.addCase(remove.pending, (state) => {
      state.deleteStatus = "pending";
      state.deleteError = null;
      state.deleteData = null;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.deleteError = null;
      state.deleteData = action.payload.message || null;
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.deleteStatus = "error";
      state.deleteError = action.error.message || null;
      state.deleteData = null;
    });
  },
});

// @TODO: Rename it later
export const selectPetsHealthLogStatus = ({ petsHealthLog }: AppState) => petsHealthLog.getStatus;
// @TODO: Rename it later
export const selectPetsHealthLogError = ({ petsHealthLog }: AppState) => petsHealthLog.getError;
// @TODO: Rename it later
export const selectPetsHealthLogData = ({ petsHealthLog }: AppState) => petsHealthLog.getData;
export const selectPetsHealthLogPostStatus = ({ petsHealthLog }: AppState) => petsHealthLog.postStatus;
export const selectPetsHealthLogPostError = ({ petsHealthLog }: AppState) => petsHealthLog.postError;
export const selectPetsHealthLogPostData = ({ petsHealthLog }: AppState) => petsHealthLog.postData;
export const selectPetsHealthLogPatchStatus = ({ petsHealthLog }: AppState) => petsHealthLog.patchStatus;
export const selectPetsHealthLogPatchError = ({ petsHealthLog }: AppState) => petsHealthLog.patchError;
export const selectPetsHealthLogPatchData = ({ petsHealthLog }: AppState) => petsHealthLog.patchData;
export const selectPetsHealthLogDeleteStatus = ({ petsHealthLog }: AppState) => petsHealthLog.deleteStatus;
export const selectPetsHealthLogDeleteError = ({ petsHealthLog }: AppState) => petsHealthLog.deleteError;
export const selectPetsHealthLogDeleteData = ({ petsHealthLog }: AppState) => petsHealthLog.deleteData;
// @TODO: Rename it later
export const selectPetsHealthLogDataById =
  (healthLogId: string) =>
  ({ petsHealthLog }: AppState) =>
    petsHealthLog.getData?.find((healthLog) => healthLog.id === healthLogId);

export const petsHealthLogActions = {
  ...petsHealthLogSlice.actions,
  get,
  post,
  patch,
  remove,
};
