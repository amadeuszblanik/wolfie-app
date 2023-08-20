import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { lastElement } from "bme-utils";
import { ApiStatus } from "../services/api/types/status.type";
import { GenericMessageApi } from "../services/api/types/generic-message.type";
import { ApiService } from "../services";
import { WeightCreatePayloadApi } from "../services/api/types/weight-create-payload.type";
import { ResultsListApi } from "../services/api/types/results-list.type";
import { WeightApi } from "../services/api/types/weight.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  ResultsListApi<WeightApi>,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>("petsWeight/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.get(petId));

const post = createAsyncThunk<
  GenericMessageApi,
  { petId: string; payload: WeightCreatePayloadApi },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsWeight/post",
  async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.post(petId, payload),
);

const patch = createAsyncThunk<
  GenericMessageApi,
  { petId: string; weightId: string; payload: WeightCreatePayloadApi },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsWeight/patch",
  async ({ petId, weightId, payload }, thunkAPI) =>
    await thunkAPI.extra.apiService.petsWeight.patch(petId, weightId, payload),
);

const remove = createAsyncThunk<
  GenericMessageApi,
  { petId: string; weightId: string },
  { extra: { apiService: ApiService }; rejectValue: GenericMessageApi }
>(
  "petsWeight/delete",
  async ({ petId, weightId }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.delete(petId, weightId),
);

export interface PetsWeightStore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: WeightApi[] | null;
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

const initialState: PetsWeightStore = {
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

export const petsWeightsSlice = createSlice({
  name: "petsWeights",

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
export const selectPetsWeightStatus = ({ petsWeights }: AppState) => petsWeights.getStatus;
// @TODO: Rename it later
export const selectPetsWeightError = ({ petsWeights }: AppState) => petsWeights.getError;
// @TODO: Rename it later
export const selectPetsWeightData = ({ petsWeights }: AppState) => petsWeights.getData;
export const selectPetsWeightPostStatus = ({ petsWeights }: AppState) => petsWeights.postStatus;
export const selectPetsWeightPostError = ({ petsWeights }: AppState) => petsWeights.postError;
export const selectPetsWeightPostData = ({ petsWeights }: AppState) => petsWeights.postData;
export const selectPetsWeightPatchStatus = ({ petsWeights }: AppState) => petsWeights.patchStatus;
export const selectPetsWeightPatchError = ({ petsWeights }: AppState) => petsWeights.patchError;
export const selectPetsWeightPatchData = ({ petsWeights }: AppState) => petsWeights.patchData;
export const selectPetsWeightDeleteStatus = ({ petsWeights }: AppState) => petsWeights.deleteStatus;
export const selectPetsWeightDeleteError = ({ petsWeights }: AppState) => petsWeights.deleteError;
export const selectPetsWeightDeleteData = ({ petsWeights }: AppState) => petsWeights.deleteData;

export const selectPetsWeightDataById =
  (weightId: string) =>
  ({ petsWeights }: AppState) =>
    petsWeights.getData?.find((weight) => weight.id === weightId);
export const selectPetsWeightDataLast = ({ petsWeights }: AppState) => {
  const data = petsWeights.getData;
  if (!data) {
    return null;
  }

  return lastElement(data);
};

export const petsWeightActions = {
  ...petsWeightsSlice.actions,
  get,
  post,
  patch,
  remove,
};
