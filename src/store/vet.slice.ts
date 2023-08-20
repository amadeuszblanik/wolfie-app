import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { GenericMessageApi } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { ResultsListApi } from "../services/api/types/results-list.type";
import { VetApi } from "../services/api/types/vet.type";
import { VetCreateApi } from "../services/api/types/vet-create.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  ResultsListApi<VetApi>,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("vet/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.vet.get());

const post = createAsyncThunk<
  GenericMessageApi,
  VetCreateApi,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("vet/post", async (payload, thunkAPI) => await thunkAPI.extra.apiService.vet.post(payload));

const patch = createAsyncThunk<
  GenericMessageApi,
  {
    vetId: string;
    payload: VetCreateApi;
  },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("vet/patch", async ({ vetId, payload }, thunkAPI) => await thunkAPI.extra.apiService.vet.patch(vetId, payload));

const remove = createAsyncThunk<
  GenericMessageApi,
  string,
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("vet/delete", async (vetId, thunkAPI) => await thunkAPI.extra.apiService.vet.delete(vetId));

export interface VetStore {
  status: ApiStatus;
  data: VetApi[] | null;
  error: string | null;
  postStatus: ApiStatus;
  postData: GenericMessageApi | null;
  postError: string | null;
  patchStatus: ApiStatus;
  patchData: GenericMessageApi | null;
  patchError: string | null;
  deleteStatus: ApiStatus;
  deleteData: GenericMessageApi | null;
  deleteError: string | null;
}

const initialState: VetStore = {
  status: "idle",
  data: null,
  error: null,
  postStatus: "idle",
  postData: null,
  postError: null,
  patchStatus: "idle",
  patchData: null,
  patchError: null,
  deleteStatus: "idle",
  deleteData: null,
  deleteError: null,
};

export const vetSlice = createSlice({
  name: "vet",

  initialState,

  reducers: {
    resetPost: (state) => {
      state.postStatus = "idle";
      state.postError = null;
    },
    resetPatch: (state) => {
      state.patchStatus = "idle";
      state.patchError = null;
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
      state.status = "pending";
      state.data = null;
      state.error = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.results;
      state.error = null;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.status = "error";
      state.data = null;
      state.error = action.error.message || null;
    });
    builder.addCase(post.pending, (state) => {
      state.postStatus = "pending";
      state.postData = null;
      state.postError = null;
    });
    builder.addCase(post.fulfilled, (state, action) => {
      state.postStatus = "success";
      state.postData = action.payload;
      state.postError = null;
    });
    builder.addCase(post.rejected, (state, action) => {
      state.postStatus = "error";
      state.postData = null;
      state.postError = action.error.message || null;
    });
    builder.addCase(patch.pending, (state) => {
      state.patchStatus = "pending";
      state.patchData = null;
      state.patchError = null;
    });
    builder.addCase(patch.fulfilled, (state, action) => {
      state.patchStatus = "success";
      state.patchData = action.payload;
      state.patchError = null;
    });
    builder.addCase(patch.rejected, (state, action) => {
      state.patchStatus = "error";
      state.patchData = null;
      state.patchError = action.error.message || null;
    });
    builder.addCase(remove.pending, (state) => {
      state.deleteStatus = "pending";
      state.deleteData = null;
      state.deleteError = null;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.deleteData = action.payload;
      state.deleteError = null;
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.deleteStatus = "error";
      state.deleteData = null;
      state.deleteError = action.error.message || null;
    });
  },
});

export const selectVetStatus = ({ vet }: AppState) => vet.status;
export const selectVetError = ({ vet }: AppState) => vet.error;
export const selectVetData = ({ vet }: AppState) => vet.data;
export const selectVetDataById =
  (vetId: string) =>
  ({ vet }: AppState) =>
    vet.data?.find(({ id }) => id === vetId);

export const selectVetPostStatus = ({ vet }: AppState) => vet.postStatus;
export const selectVetPostError = ({ vet }: AppState) => vet.postError;
export const selectVetPostData = ({ vet }: AppState) => vet.postData;

export const selectVetPatchStatus = ({ vet }: AppState) => vet.patchStatus;
export const selectVetPatchError = ({ vet }: AppState) => vet.patchError;
export const selectVetPatchData = ({ vet }: AppState) => vet.patchData;

export const selectVetDeleteStatus = ({ vet }: AppState) => vet.deleteStatus;
export const selectVetDeleteError = ({ vet }: AppState) => vet.deleteError;
export const selectVetDeleteData = ({ vet }: AppState) => vet.deleteData;

export const vetActions = {
  ...vetSlice.actions,
  get,
  post,
  patch,
  remove,
};
