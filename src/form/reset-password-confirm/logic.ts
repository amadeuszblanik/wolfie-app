import { useRouter } from "next/router";
import { FormData } from "./type";
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
  };
};

export default useLogic;
