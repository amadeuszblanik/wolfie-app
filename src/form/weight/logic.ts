import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PetsPetIdWeightPostPayload } from "../../services/api/types/pets/:petId/weight/post/payload.type";
import {
  petsWeightActions,
  selectPetsWeightDataById,
  selectPetsWeightDataLast,
  selectPetsWeightError,
  selectPetsWeightPatchError,
  selectPetsWeightPatchStatus,
  selectPetsWeightPostError,
  selectPetsWeightPostStatus,
  selectPetsWeightStatus,
} from "../../store/petsWeight.slice";
import { ApiStatus } from "../../services/api/types/status.type";
import { toInputDate, toInputTime } from "../../utils";

const DEFAULT_WEIGHT = 15;

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const weightId = router.query.weightId as string | undefined;
  const isEdit = !!weightId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const storeDataStatus = useAppSelector(selectPetsWeightStatus);
  const storeDataError = useAppSelector(selectPetsWeightError);
  const storeDataById = useAppSelector(selectPetsWeightDataById(weightId || ""));
  const storeDataLast = useAppSelector(selectPetsWeightDataLast);

  const storePetsWeightPostStatus = useAppSelector(selectPetsWeightPostStatus);
  const storePetsWeightPostError = useAppSelector(selectPetsWeightPostError);
  const storePetsWeightPatchStatus = useAppSelector(selectPetsWeightPatchStatus);
  const storePetsWeightPatchError = useAppSelector(selectPetsWeightPatchError);

  const isLoading = storeDataStatus === "pending" || storeDataStatus === "idle";
  const loadFailedLast = !isLoading && !storeDataById;
  const loadFailed = isEdit ? storeDataStatus === "error" || loadFailedLast : false;

  const storeStatus: ApiStatus = isLoading
    ? "pending"
    : isEdit
    ? storePetsWeightPatchStatus
    : storePetsWeightPostStatus;
  const storeError = isEdit ? storePetsWeightPatchError : storePetsWeightPostError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.weight_update.success" : "common.form.weight_add.success",
  });

  const loadForm = () => {
    if (!petId) {
      return;
    }

    dispatch(petsWeightActions.get({ petId }));
  };

  useEffect(loadForm, [petId]);

  useEffect(() => {
    if (storeDataById) {
      setValue("weight", storeDataById.weight.value);
      setValue("date", toInputDate(storeDataById.date));
      setValue("time", toInputTime(storeDataById.date));
    } else {
      setValue("weight", storeDataLast?.weight.value || DEFAULT_WEIGHT);
      setValue("date", toInputDate());
      setValue("time", toInputTime());
    }
  }, [storeDataLast, storeDataLast]);

  const submit = (formData: FormData) => {
    const payload: PetsPetIdWeightPostPayload = {
      weight: formData.weight,
      date: new Date(`${formData.date}T${formData.time}`),
    };

    if (isEdit) {
      dispatch(
        petsWeightActions.patch({
          petId: petId as string,
          weightId: weightId as string,
          payload,
        }),
      );

      return;
    }

    dispatch(
      petsWeightActions.post({
        petId: petId as string,
        payload,
      }),
    );
  };

  const resetForm = () => {
    dispatch(isEdit ? petsWeightActions.resetPatch() : petsWeightActions.resetPost());
  };

  return {
    apiStatus: storeStatus,
    apiError: storeError,
    apiMessage: storeMessage,
    submit,
    resetForm,
    disabled: isLoading,
    loadFailed,
    loadFailedMessage: storeDataError,
    tryAgainLoadForm: loadForm,
    control,
    handleSubmit,
    errors,
  };
};

export default useLogic;
