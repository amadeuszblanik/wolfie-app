import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth.slice";
import { signUpSlice } from "./sign-up.slice";
import { profileSlice } from "./profile.slice";
import { configSlice } from "./config.slice";
import { petsSlice } from "./pets.slice";
import { petsWeightsSlice } from "./petsWeight.slice";
import { petsHealthLogSlice } from "./petsHealthLog.slice";
import { refreshTokenSlice } from "./refresh-token.slice";
import { ApiService } from "../services";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [configSlice.name]: configSlice.reducer,
      [petsSlice.name]: petsSlice.reducer,
      [petsHealthLogSlice.name]: petsHealthLogSlice.reducer,
      [petsWeightsSlice.name]: petsWeightsSlice.reducer,
      [profileSlice.name]: profileSlice.reducer,
      [refreshTokenSlice.name]: refreshTokenSlice.reducer,
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
