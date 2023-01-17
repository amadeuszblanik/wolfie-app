import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiErrorMessage } from "../services/api/types/error-message.type";
import { ApiService } from "../services";
import { PetsPetIdWeightGetResponse } from "../services/api/types/pets/:petId/weight/get/response.type";
import { PetsPetIdWeightPostResponse } from "../services/api/types/pets/:petId/weight/post/response.type";
import { PetsPetIdWeightPostPayload } from "../services/api/types/pets/:petId/weight/post/payload.type";
import { PetsPetIdWeightPatchResponse } from "../services/api/types/pets/:petId/weight/patch/response.type";
import { PetsPetIdWeightPatchPayload } from "../services/api/types/pets/:petId/weight/patch/payload.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  PetsPetIdWeightGetResponse,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>("petsWeight/get", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.get(petId));

const post = createAsyncThunk<
  PetsPetIdWeightPostResponse,
  { petId: string; payload: PetsPetIdWeightPostPayload },
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>(
  "petsWeight/post",
  async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.petsWeight.post(petId, payload),
);

const patch = createAsyncThunk<
  PetsPetIdWeightPatchResponse,
  { petId: string; weightId: string; payload: PetsPetIdWeightPatchPayload },
  { extra: { apiService: ApiService }; rejectValue: ApiErrorMessage }
>(
  "petsWeight/patch",
  async ({ petId, weightId, payload }, thunkAPI) =>
    await thunkAPI.extra.apiService.petsWeight.patch(petId, weightId, payload),
);

export interface PetsWeightStore {
  getStatus: ApiStatus;
  getError: string | null;
  getData: PetsPetIdWeightGetResponse | null;
  postStatus: ApiStatus;
  postError: string | null;
  postData: PetsPetIdWeightPostResponse | null;
  patchStatus: ApiStatus;
  patchError: string | null;
  patchData: PetsPetIdWeightPatchResponse | null;
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
// @TODO: Rename it later
export const selectPetsWeightDataById =
  (weightId: string) =>
  ({ petsWeights }: AppState) =>
    petsWeights.getData?.find((weight) => weight.id === weightId);

export const petsWeightActions = {
  ...petsWeightsSlice.actions,
  get,
  post,
  patch,
};
