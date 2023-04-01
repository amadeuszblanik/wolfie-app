import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsHealthLogActions,
  selectPetsHealthLogDataById,
  selectPetsHealthLogPatchError,
  selectPetsHealthLogPatchStatus,
  selectPetsHealthLogPostError,
  selectPetsHealthLogPostStatus,
  selectPetsHealthLogStatus,
} from "../../store/petsHealthLog.slice";
import { PetsPetIdHealthLogPostPayload } from "../../services/api/types/pets/:petId/health-log/post/payload.type";
import { selectPetsWeightError } from "../../store/petsWeight.slice";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const healthLogId = router.query.healthLogId as string | undefined;
  const isEdit = !!healthLogId;

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const storeDataStatus = useAppSelector(selectPetsHealthLogStatus);
  const storeDataError = useAppSelector(selectPetsWeightError);
  const storeDataById = useAppSelector(selectPetsHealthLogDataById(healthLogId || ""));

  const storePetsHealthLogPostStatus = useAppSelector(selectPetsHealthLogPostStatus);
  const storePetsHealthLogPostError = useAppSelector(selectPetsHealthLogPostError);
  const storePetsHealthLogPatchStatus = useAppSelector(selectPetsHealthLogPatchStatus);
  const storePetsHealthLogPatchError = useAppSelector(selectPetsHealthLogPatchError);

  const storeStatus = isEdit ? storePetsHealthLogPatchStatus : storePetsHealthLogPostStatus;
  const storeError = isEdit ? storePetsHealthLogPatchError : storePetsHealthLogPostError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.health_log_update.success" : "common.form.health_log_add.success",
  });

  const isLoading = storeDataStatus === "pending" || storeDataStatus === "idle";
  const loadFailedLast = !isLoading && !storeDataById;
  const loadFailed = isEdit ? storeDataStatus === "error" || loadFailedLast : false;

  const loadForm = () => {
    if (!petId) {
      return;
    }

    dispatch(petsHealthLogActions.get({ petId }));
  };

  useEffect(loadForm, [petId]);

  useEffect(() => {
    if (storeDataById) {
      setValue("kind", storeDataById.kind);
      setValue("date", storeDataById.date);
      setValue(
        "medicines",
        storeDataById.medicines.map((medicine) => medicine.productNumber),
      );
      setValue("additionalMedicines", storeDataById.additionalMedicines || []);
      setValue("diagnosis", storeDataById.diagnosis || undefined);
      setValue("veterinary", storeDataById.veterinary || undefined);
      setValue("description", storeDataById.description || undefined);
    }
  }, [storeDataById]);

  const submit = (formData: FormData) => {
    const payload: PetsPetIdHealthLogPostPayload = {
      kind: formData.kind,
      date: formData.date,
      medicines: formData.medicines,
      additionalMedicines: formData.additionalMedicines.join(","),
      diagnosis: formData.diagnosis,
      nextVisit: formData.nextVisit ? new Date(formData.nextVisit) : undefined,
      veterinary: formData.veterinary,
      description: formData.description,
    };

    if (isEdit) {
      dispatch(
        petsHealthLogActions.patch({
          petId: petId as string,
          healthLogId: healthLogId as string,
          payload,
        }),
      );

      return;
    }

    dispatch(
      petsHealthLogActions.post({
        petId: petId as string,
        payload,
      }),
    );
  };

  const resetForm = () => {
    dispatch(isEdit ? petsHealthLogActions.resetPatch() : petsHealthLogActions.resetPost());
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
    watch,
    control,
    handleSubmit,
    setValue,
    errors,
  };
};

export default useLogic;
