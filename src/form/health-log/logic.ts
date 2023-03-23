import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsHealthLogActions,
  selectPetsHealthLogPatchError,
  selectPetsHealthLogPatchStatus,
  selectPetsHealthLogPostError,
  selectPetsHealthLogPostStatus,
} from "../../store/petsHealthLog.slice";
import { PetsPetIdHealthLogPostPayload } from "../../services/api/types/pets/:petId/health-log/post/payload.type";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const healthLogId = router.query.healthLogId as string | undefined;
  const isEdit = !!healthLogId;

  const storePetsHealthLogPostStatus = useAppSelector(selectPetsHealthLogPostStatus);
  const storePetsHealthLogPostError = useAppSelector(selectPetsHealthLogPostError);
  const storePetsHealthLogPatchStatus = useAppSelector(selectPetsHealthLogPatchStatus);
  const storePetsHealthLogPatchError = useAppSelector(selectPetsHealthLogPatchError);

  const storeStatus = isEdit ? storePetsHealthLogPatchStatus : storePetsHealthLogPostStatus;
  const storeError = isEdit ? storePetsHealthLogPatchError : storePetsHealthLogPostError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.health_log_update.success" : "common.form.health_log_add.success",
  });

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
  };
};

export default useLogic;
