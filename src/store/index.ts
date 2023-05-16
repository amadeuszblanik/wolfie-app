import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth.slice";
import { signUpSlice } from "./sign-up.slice";
import { profileSlice } from "./profile.slice";
import { limitSlice } from "./limit.slice";
import { petsSlice } from "./pets.slice";
import { petsWeightsSlice } from "./petsWeight.slice";
import { petsHealthLogSlice } from "./petsHealthLog.slice";
import { refreshTokenSlice } from "./refresh-token.slice";
import { confirmEmailSlice } from "./confirm-email.slice";
import { resetPasswordSlice } from "./reset-password.slice";
import { breedsSlice } from "./breeds.slice";
import { medicinesSlice } from "./medicines.slice";
import { calendarSlice } from "./calendar.slice";
import { ApiService } from "../services";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [breedsSlice.name]: breedsSlice.reducer,
      [calendarSlice.name]: calendarSlice.reducer,
      [limitSlice.name]: limitSlice.reducer,
      [confirmEmailSlice.name]: confirmEmailSlice.reducer,
      [medicinesSlice.name]: medicinesSlice.reducer,
      [petsSlice.name]: petsSlice.reducer,
      [petsHealthLogSlice.name]: petsHealthLogSlice.reducer,
      [petsWeightsSlice.name]: petsWeightsSlice.reducer,
      [profileSlice.name]: profileSlice.reducer,
      [refreshTokenSlice.name]: refreshTokenSlice.reducer,
      [resetPasswordSlice.name]: resetPasswordSlice.reducer,
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
