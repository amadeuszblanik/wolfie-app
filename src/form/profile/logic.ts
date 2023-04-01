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
  selectProfilePutError,
  selectProfilePutStatus,
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

  const storeStatus = useAppSelector(selectProfilePutStatus);
  const storeError = useAppSelector(selectProfilePutError);

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
      setValue("weightUnit", storeData.weightUnit);
    }
  };

  useEffect(loadForm, [storeData]);

  const submit = (formData: FormData) => {
    dispatch(
      profileActions.put({
        firstName: formData.firstName,
        lastName: formData.lastName,
        weightUnit: formData.weightUnit,
      }),
    );
  };

  const resetForm = () => {
    dispatch(profileActions.resetPut());
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
