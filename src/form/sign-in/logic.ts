import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormSignInData } from "./type";
import { authActions, selectAuthError, selectAuthStatus } from "../../store/auth.slice";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";

const useLogic = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const storeAuthStatus = useAppSelector(selectAuthStatus);
  const storeAuthError = useAppSelector(selectAuthError);

  const deviceName = useDeviceName();

  useEffect(() => {
    if (storeAuthError) {
      return;
    }

    switch (storeAuthStatus) {
      case "success":
        void router.push("/app");
        break;
    }
  }, [storeAuthStatus, storeAuthError, router]);

  const submit = (formData: FormSignInData) => {
    dispatch(
      authActions.signIn({
        username: formData.username,
        password: formData.password,
        keepSignIn: true,
        device: deviceName,
      }),
    );
  };

  const resetForm = () => {
    dispatch(authActions.resetForm());
  };

  return {
    apiStatus: storeAuthStatus,
    apiError: storeAuthError,
    submit,
    resetForm,
  };
};

export default useLogic;
