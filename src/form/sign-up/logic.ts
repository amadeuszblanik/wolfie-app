import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectSignUpError, selectSignUpMessage, selectSignUpStatus, signUpActions } from "../../store/sign-up.slice";

const useLogic = () => {
  const dispatch = useAppDispatch();
  const storeStatus = useAppSelector(selectSignUpStatus);
  const storeError = useAppSelector(selectSignUpError);
  const storeMessage = useAppSelector(selectSignUpMessage);

  const submit = (formData: FormData) => {
    dispatch(
      signUpActions.signUp({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        weightUnit: formData.weightUnit,
        gdprConsent: formData.gdprConsent ?? false,
      }),
    );
  };

  const resetForm = () => {
    dispatch(signUpActions.resetForm());
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
