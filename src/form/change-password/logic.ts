import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  profileActions,
  selectProfileChangePasswordError,
  selectProfileChangePasswordMessage,
  selectProfileChangePasswordStatus,
} from "../../store/profile.slice";

const useLogic = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

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
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
