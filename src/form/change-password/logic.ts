import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  profileActions,
  selectProfileChangePasswordError,
  selectProfileChangePasswordMessage,
  selectProfileChangePasswordStatus,
} from "../../store/profile.slice";

const useLogic = () => {
  const dispatch = useAppDispatch();
  const storeStatus = useAppSelector(selectProfileChangePasswordStatus);
  const storeError = useAppSelector(selectProfileChangePasswordError);
  const storeMessage = useAppSelector(selectProfileChangePasswordMessage);

  const submit = (formData: FormData) => {
    dispatch(
      profileActions.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        newPasswordConfirm: formData.newPasswordConfirm,
      }),
    );
  };

  const resetForm = () => {
    dispatch(profileActions.resetChangePassword());
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
