import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectSignUpError, selectSignUpMessage, selectSignUpStatus, signUpActions } from "../../store/sign-up.slice";

const useLogic = () => {
  const dispatch = useAppDispatch();

  const storeStatus = useAppSelector(selectSignUpStatus);
  const storeError = useAppSelector(selectSignUpError);
  const storeMessage = useAppSelector(selectSignUpMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const submit = (formData: FormData) => {
    dispatch(
      signUpActions.signUp({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        birthDate: formData.birthDate,
        weightUnit: formData.weightUnit,
        acceptedGdpr: formData.acceptedGdpr ?? false,
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
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
