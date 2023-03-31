import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { authActions, selectAuthError, selectAuthStatus } from "../../store/auth.slice";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";

const useLogic = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const storeAuthStatus = useAppSelector(selectAuthStatus);
  const storeAuthError = useAppSelector(selectAuthError);

  const deviceName = useDeviceName();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

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

  const submit = (formData: FormData) => {
    dispatch(
      authActions.signIn({
        username: formData.username,
        password: formData.password,
        keepSignIn: formData.keepSignIn,
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
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
