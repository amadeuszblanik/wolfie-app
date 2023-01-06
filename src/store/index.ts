import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice, AuthStore } from "./auth.slice";
import { signUpSlice, SignUpStore } from "./sign-up.slice";
import { profileSlice, ProfileStore } from "./profile.slice";
import { configSlice, ConfigStore } from "./config.slice";
import { petsSlice, PetsStore } from "./pets.slice";
import { petsWeightsSlice, PetsWeightStore } from "./petsWeight.slice";
import { ApiService } from "../services";

export interface State {
  auth: AuthStore;
  config: ConfigStore;
  pets: PetsStore;
  petsWeight: PetsWeightStore;
  profile: ProfileStore;
  signUp: SignUpStore;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [configSlice.name]: configSlice.reducer,
      [petsSlice.name]: petsSlice.reducer,
      [petsWeightsSlice.name]: petsWeightsSlice.reducer,
      [profileSlice.name]: profileSlice.reducer,
      [signUpSlice.name]: signUpSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            apiService: new ApiService(),
          },
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
