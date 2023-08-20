import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  profileActions,
  selectProfileData,
  selectProfileGetError,
  selectProfileGetStatus,
  selectProfilepatchError,
  selectProfilepatchStatus,
} from "../../store/profile.slice";

const useLogic = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const storeDataStatus = useAppSelector(selectProfileGetStatus);
  const storeDataError = useAppSelector(selectProfileGetError);
  const storeData = useAppSelector(selectProfileData);

  const isLoading = storeDataStatus === "pending" || storeDataStatus === "idle";
  const loadFailedLast = !isLoading && !storeData;
  const loadFailed = storeDataStatus === "error" || loadFailedLast;

  const storeStatus = useAppSelector(selectProfilepatchStatus);
  const storeError = useAppSelector(selectProfilepatchError);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const loadForm = () => {
    if (storeData) {
      setValue("firstName", storeData.firstName);
      setValue("lastName", storeData.lastName);
      setValue("birthDate", storeData.birthDate);
      setValue("weightUnit", storeData.weightUnit);
    }
  };

  useEffect(loadForm, [storeData]);

  const submit = (formData: FormData) => {
    dispatch(
      profileActions.patch({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        weightUnit: formData.weightUnit,
      }),
    );
  };

  const resetForm = () => {
    dispatch(profileActions.resetPatch());
  };

  return {
    apiStatus: storeStatus,
    apiError: storeError,
    apiMessage: intl.formatMessage({ id: "common.form.profile.success" }),
    submit,
    loadFailed,
    loadFailedMessage: storeDataError,
    tryAgainLoadForm: loadForm,
    resetForm,
    setValue,
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
