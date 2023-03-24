import { FormData } from "./type";
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
  };
};

export default useLogic;
