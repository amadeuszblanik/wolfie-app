import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PetsPetIdWeightPostPayload } from "../../services/api/types/pets/:petId/weight/post/payload.type";
import {
  petsWeightActions,
  selectPetsWeightPatchError,
  selectPetsWeightPatchStatus,
  selectPetsWeightPostError,
  selectPetsWeightPostStatus,
} from "../../store/petsWeight.slice";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const weightId = router.query.weightId as string | undefined;
  const isEdit = !!weightId;

  // Weight only
  const storePetsWeightPostStatus = useAppSelector(selectPetsWeightPostStatus);
  const storePetsWeightPostError = useAppSelector(selectPetsWeightPostError);
  const storePetsWeightPatchStatus = useAppSelector(selectPetsWeightPatchStatus);
  const storePetsWeightPatchError = useAppSelector(selectPetsWeightPatchError);

  const storeStatus = isEdit ? storePetsWeightPatchStatus : storePetsWeightPostStatus;
  const storeError = isEdit ? storePetsWeightPatchError : storePetsWeightPostError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.weight_update.success" : "common.form.weight_add.success",
  });

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
  };
};

export default useLogic;
