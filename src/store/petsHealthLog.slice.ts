import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { PetsPetIdHealthLogGetResponse } from "../services/api/types/pets/:petId/health-log/get/response.type";
import { PetsPetIdHealthLogPostPayload } from "../services/api/types/pets/:petId/health-log/post/payload.type";
import { PetsPetIdHealthLogPostResponse } from "../services/api/types/pets/:petId/health-log/post/response.type";
import { PetsPetIdHealthLogPatchResponse } from "../services/api/types/pets/:petId/health-log/patch/response.type";
import { PetsPetIdHealthLogPatchPayload } from "../services/api/types/pets/:petId/health-log/patch/payload.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  PetsPetIdHealthLogGetResponse,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("petsHealthLog/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.get(petId));

const post = createAsyncThunk<
  PetsPetIdHealthLogPostResponse,
  { petId: string; payload: PetsPetIdHealthLogPostPayload },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>(
  "petsHealthLog/post",
  async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.petsHealthLog.post(petId, payload),
);

const patch = createAsyncThunk<
  PetsPetIdHealthLogPatchResponse,
  { petId: string; healthLogId: string; payload: PetsPetIdHealthLogPatchPayload },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>(
  "petsHealthLog/patch",
  async ({ petId, healthLogId, payload }, thunkAPI) =>
    await thunkAPI.extra.apiService.petsHealthLog.patch(petId, healthLogId, payload),
);

export interface PetsHealthLogtore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: PetsPetIdHealthLogGetResponse | null;
  postStatus: ApiStatus;
  postError: string | null;
  postData: PetsPetIdHealthLogPostResponse | null;
  patchStatus: ApiStatus;
  patchError: string | null;
  patchData: PetsPetIdHealthLogPatchResponse | null;
}

const initialState: PetsHealthLogtore = {
  getStatus: "idle",
  getError: null,
  getData: null,
  postStatus: "idle",
  postError: null,
  postData: null,
  patchStatus: "idle",
  patchError: null,
  patchData: null,
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
      state.getData = action.payload;
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
};
