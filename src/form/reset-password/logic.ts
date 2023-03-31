import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  resetPasswordActions,
  selectResetPasswordGetError,
  selectResetPasswordGetMessage,
  selectResetPasswordGetStatus,
} from "../../store/reset-password.slice";

const useLogic = () => {
  const dispatch = useAppDispatch();

  const storeStatus = useAppSelector(selectResetPasswordGetStatus);
  const storeError = useAppSelector(selectResetPasswordGetError);
  const storeMessage = useAppSelector(selectResetPasswordGetMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const submit = (formData: FormData) => {
    dispatch(
      resetPasswordActions.get({
        userEmail: formData.userEmail,
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
