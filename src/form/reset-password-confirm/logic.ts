import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  resetPasswordActions,
  selectResetPasswordPutError,
  selectResetPasswordPutMessage,
  selectResetPasswordPutStatus,
} from "../../store/reset-password.slice";

const useLogic = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeStatus = useAppSelector(selectResetPasswordPutStatus);
  const storeError = useAppSelector(selectResetPasswordPutError);
  const storeMessage = useAppSelector(selectResetPasswordPutMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const submit = (formData: FormData) => {
    dispatch(
      resetPasswordActions.put({
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        token: router.query.token as string,
      }),
    );
  };

  const resetForm = () => {
    dispatch(resetPasswordActions.resetGetForm());
  };

  return {
    apiStatus: storeStatus,
    apiError: storeError,
    apiMessage: storeMessage,
    submit,
    resetForm,
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
