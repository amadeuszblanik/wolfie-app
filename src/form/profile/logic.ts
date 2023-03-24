import { useIntl } from "react-intl";
import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { profileActions, selectProfilePutError, selectProfilePutStatus } from "../../store/profile.slice";

const useLogic = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const storeStatus = useAppSelector(selectProfilePutStatus);
  const storeError = useAppSelector(selectProfilePutError);

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
    resetForm,
  };
};

export default useLogic;
