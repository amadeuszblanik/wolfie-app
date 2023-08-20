import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectVetDataById,
  selectVetError,
  selectVetPatchError,
  selectVetPatchStatus,
  selectVetPostError,
  selectVetPostStatus,
  selectVetStatus,
  vetActions,
} from "../../store/vet.slice";
import { VetCreateApi } from "../../services/api/types/vet-create.type";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const vetId = router.query.vetId as string | undefined;
  const isEdit = !!vetId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const storeDataStatus = useAppSelector(selectVetStatus);
  const storeDataError = useAppSelector(selectVetError);
  const storeDataById = useAppSelector(selectVetDataById(vetId || ""));

  const storeAddStatus = useAppSelector(selectVetPostStatus);
  const storeAddError = useAppSelector(selectVetPostError);
  const storeEditStatus = useAppSelector(selectVetPatchStatus);
  const storeEditError = useAppSelector(selectVetPatchError);

  const isLoading = storeDataStatus === "pending" || storeDataStatus === "idle";
  const loadFailedById = !isLoading && !storeDataById;
  const loadFailed = isEdit ? storeDataStatus === "error" || loadFailedById : false;

  const storeStatus = isEdit ? storeEditStatus : storeAddStatus;
  const storeError = isEdit ? storeEditError : storeAddError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.pet_update.success" : "common.form.pet_add.success",
  });

  useEffect(() => {
    dispatch(isEdit ? vetActions.resetPost() : vetActions.resetPatch());
  }, []);

  const loadForm = () => {
    if (!(storeStatus === "idle" || storeStatus === "success")) {
      return;
    }

    dispatch(vetActions.get());
  };

  useEffect(loadForm, [storeStatus]);

  useEffect(() => {
    if (storeDataById) {
      setValue("name", storeDataById.name);
      setValue("address", storeDataById.address || undefined);
      setValue("city", storeDataById.city || undefined);
      setValue("postCode", storeDataById.postCode || undefined);
      setValue("country", storeDataById.country || undefined);
      setValue("phoneNumber", storeDataById.phoneNumber || undefined);
      setValue("email", storeDataById.email || undefined);
    }
  }, [storeDataById]);

  const submit = (formData: FormData) => {
    const payload: VetCreateApi = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      postCode: formData.postCode,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    };

    if (isEdit) {
      dispatch(
        vetActions.patch({
          vetId: vetId as string,
          payload,
        }),
      );

      return;
    }

    dispatch(vetActions.post(payload));
  };

  const resetForm = () => {
    dispatch(vetActions.get());
    dispatch(isEdit ? vetActions.resetPatch() : vetActions.resetPost());
  };

  return {
    apiStatus: storeStatus,
    apiError: storeError,
    apiMessage: storeMessage,
    submit,
    resetForm,
    loadFailed,
    loadFailedMessage: storeDataError,
    tryAgainLoadForm: loadForm,
    control,
    handleSubmit,
    errors,
    setValue,
  };
};

export default useLogic;
