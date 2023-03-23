import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { FormData } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsActions,
  selectPetsAddError,
  selectPetsAddStatus,
  selectPetsEditError,
  selectPetsEditStatus,
} from "../../store/pets.slice";
import { PetKind } from "../../types/pet-kind.type";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const isEdit = !!petId;

  const storePetsAddStatus = useAppSelector(selectPetsAddStatus);
  const storePetsAddError = useAppSelector(selectPetsAddError);
  const storePetsEditStatus = useAppSelector(selectPetsEditStatus);
  const storePetsEditError = useAppSelector(selectPetsEditError);

  const storeStatus = isEdit ? storePetsEditStatus : storePetsAddStatus;
  const storeError = isEdit ? storePetsEditError : storePetsAddError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.pet_update.success" : "common.form.pet_add.success",
  });

  const submit = (formData: FormData) => {
    const payload = {
      name: formData.name,
      kind: PetKind.Dog,
      breed: formData.breed,
      microchip: formData.microchip,
      birthDate: new Date(formData.birthDate),
    };

    if (isEdit) {
      dispatch(
        petsActions.edit({
          petId: petId as string,
          payload,
        }),
      );

      return;
    }

    dispatch(petsActions.add(payload));
  };

  const resetForm = () => {
    dispatch(isEdit ? petsActions.resetEdit() : petsActions.resetAdd());
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
