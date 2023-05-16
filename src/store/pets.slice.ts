import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus } from "../services/api/types/status.type";
import { ApiMessage } from "../services/api/types/api-message.type";
import { ApiService } from "../services";
import { PetsAddResponse } from "../services/api/types/pets/add/response.type";
import { PetsAddPayload } from "../services/api/types/pets/add/payload.type";
import { PetsPetIdPutResponse } from "../services/api/types/pets/:petId/put/response.type";
import { PetsPetIdAvatarPostPayload } from "../services/api/types/pets/:petId/avatar/payload.type";
import { PetsPetIdAvatarPostResponse } from "../services/api/types/pets/:petId/avatar/response.type";
import { PetApi } from "../services/api/types/pet.type";
import { ResultsListApi } from "../services/api/types/results-list.type";
import { AppState } from "./index";

const get = createAsyncThunk<
  ResultsListApi<PetApi>,
  undefined,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("pets/get", async (_, thunkAPI) => await thunkAPI.extra.apiService.pets.get());

const add = createAsyncThunk<
  PetsAddResponse,
  PetsAddPayload,
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("pets/add", async (payload, thunkAPI) => await thunkAPI.extra.apiService.petsAdd.post(payload));

const edit = createAsyncThunk<
  PetsPetIdPutResponse,
  {
    petId: string;
    payload: PetsAddPayload;
  },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("pets/edit", async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.pets.patch(petId, payload));

const remove = createAsyncThunk<
  ApiMessage,
  { petId: string },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>("pets/delete", async ({ petId }, thunkAPI) => await thunkAPI.extra.apiService.pets.delete(petId));

const avatar = createAsyncThunk<
  PetsPetIdAvatarPostResponse,
  { petId: string; payload: PetsPetIdAvatarPostPayload },
  { extra: { apiService: ApiService }; rejectValue: ApiMessage }
>(
  "pets/avatar",
  async ({ petId, payload }, thunkAPI) => await thunkAPI.extra.apiService.pets.avatarPost(petId, payload),
);

export interface PetsStore {
  myStatus: ApiStatus;
  myError: string | null;
  data: PetApi[] | null;
  addStatus: ApiStatus;
  addError: string | null;
  editStatus: ApiStatus;
  editError: string | null;
  deleteStatus: ApiStatus;
  deleteError: string | null;
  deleteData: string | null;
  avatarStatus: ApiStatus;
  avatarError: string | null;
  avatarData: string | null;
}

const initialState: PetsStore = {
  myStatus: "idle",
  myError: null,
  data: null,
  addStatus: "idle",
  addError: null,
  editStatus: "idle",
  editError: null,
  deleteStatus: "idle",
  deleteError: null,
  deleteData: null,
  avatarStatus: "idle",
  avatarError: null,
  avatarData: null,
};

export const petsSlice = createSlice({
  name: "pets",

  initialState,

  reducers: {
    resetAdd: (state) => {
      state.addStatus = "idle";
      state.addError = null;
    },
    resetEdit: (state) => {
      state.editStatus = "idle";
      state.editError = null;
    },
    resetDelete: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
      state.deleteData = null;
    },
    resetAvatar: (state) => {
      state.avatarStatus = "idle";
      state.avatarError = null;
      state.avatarData = null;
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
      state.myStatus = "pending";
      state.myError = null;
      state.data = null;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.myStatus = "success";
      state.myError = null;
      state.data = action.payload.results;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.myStatus = "error";
      state.myError = action.error.message || null;
      state.data = null;
    });
    builder.addCase(add.pending, (state) => {
      state.addStatus = "pending";
      state.addError = null;
    });
    builder.addCase(add.fulfilled, (state) => {
      state.addStatus = "success";
      state.addError = null;
      // state.data = [...(state.data || []), action.payload];
    });
    builder.addCase(add.rejected, (state, action) => {
      state.addStatus = "error";
      state.addError = action.error.message || null;
    });
    builder.addCase(edit.pending, (state) => {
      state.editStatus = "pending";
      state.editError = null;
    });
    builder.addCase(edit.fulfilled, (state) => {
      state.editStatus = "success";
      state.editError = null;
      state.data = null;
    });
    builder.addCase(edit.rejected, (state, action) => {
      state.editStatus = "error";
      state.editError = action.error.message || null;
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
    builder.addCase(avatar.pending, (state) => {
      state.avatarStatus = "pending";
      state.avatarError = null;
      state.avatarData = null;
    });
    builder.addCase(avatar.fulfilled, (state, action) => {
      state.avatarStatus = "success";
      state.avatarError = null;
      state.avatarData = action.payload.message || null;
    });
    builder.addCase(avatar.rejected, (state, action) => {
      state.avatarStatus = "error";
      state.avatarError = action.error.message || null;
      state.avatarData = null;
    });
  },
});

export const selectPetsMyStatus = ({ pets }: AppState) => pets.myStatus;
export const selectPetsMyError = ({ pets }: AppState) => pets.myError;
export const selectPetsMy = ({ pets }: AppState) => pets.data;
export const selectPets =
  (id: string) =>
  ({ pets }: AppState) =>
    pets.data?.find((pet) => pet.id === id);
export const selectPetsAddStatus = ({ pets }: AppState) => pets.addStatus;
export const selectPetsAddError = ({ pets }: AppState) => pets.addError;
export const selectPetsEditStatus = ({ pets }: AppState) => pets.editStatus;
export const selectPetsEditError = ({ pets }: AppState) => pets.editError;
export const selectPetsDeleteStatus = ({ pets }: AppState) => pets.deleteStatus;
export const selectPetsDeleteError = ({ pets }: AppState) => pets.deleteError;
export const selectPetsDeleteData = ({ pets }: AppState) => pets.deleteData;
export const selectPetsAvatarStatus = ({ pets }: AppState) => pets.avatarStatus;
export const selectPetsAvatarError = ({ pets }: AppState) => pets.avatarError;
export const selectPetsAvatarData = ({ pets }: AppState) => pets.avatarData;

export const petsActions = {
  ...petsSlice.actions,
  get,
  add,
  edit,
  remove,
  avatar,
};
