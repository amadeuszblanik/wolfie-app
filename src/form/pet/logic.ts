import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormData, formSchema } from "./type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  petsActions,
  selectPets,
  selectPetsAddError,
  selectPetsAddStatus,
  selectPetsEditError,
  selectPetsEditStatus,
  selectPetsMyError,
  selectPetsMyStatus,
} from "../../store/pets.slice";
import { PetKind } from "../../types/pet-kind.type";
import { breedsActions, selectBreedsDataList } from "../../store/breeds.slice";
import { PetsAddPayload } from "../../services/api/types/pets/add/payload.type";

const useLogic = () => {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const petId = router.query.petId as string | undefined;
  const isEdit = !!petId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const storeDataStatus = useAppSelector(selectPetsMyStatus);
  const storeDataError = useAppSelector(selectPetsMyError);
  const storeDataById = useAppSelector(selectPets(petId || ""));
  const storeBreedsDataList = useAppSelector(selectBreedsDataList);

  const storePetsAddStatus = useAppSelector(selectPetsAddStatus);
  const storePetsAddError = useAppSelector(selectPetsAddError);
  const storePetsEditStatus = useAppSelector(selectPetsEditStatus);
  const storePetsEditError = useAppSelector(selectPetsEditError);

  const isLoading = storeDataStatus === "pending" || storeDataStatus === "idle";
  const loadFailedById = !isLoading && !storeDataById;
  const loadFailed = isEdit ? storeDataStatus === "error" || loadFailedById : false;

  const storeStatus = isEdit ? storePetsEditStatus : storePetsAddStatus;
  const storeError = isEdit ? storePetsEditError : storePetsAddError;
  const storeMessage = intl.formatMessage({
    id: isEdit ? "common.form.pet_update.success" : "common.form.pet_add.success",
  });

  const loadForm = () => {
    if (!(storeStatus === "idle" || storeStatus === "success")) {
      return;
    }

    dispatch(petsActions.petsMy());
    dispatch(breedsActions.get());
  };

  useEffect(loadForm, [storeStatus]);

  useEffect(() => {
    if (storeDataById) {
      setValue("name", storeDataById.name);
      setValue("breed", storeDataById.breed?.id);
      setValue("birthDate", storeDataById.birthDate);
    }
  }, [storeDataById]);

  const submit = (formData: FormData) => {
    const payload: PetsAddPayload = {
      name: formData.name,
      kind: PetKind.Dog,
      breed: formData.breed,
      pureBreed: formData.pureBreed,
      birthDate: formData.birthDate,
      microchip: formData.microchip,
      neutered: formData.neutered,
      instagram: formData.instagram,
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
    dispatch(petsActions.petsMy());
    dispatch(isEdit ? petsActions.resetEdit() : petsActions.resetAdd());
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
    breedsList: storeBreedsDataList,
  };
};

export default useLogic;
