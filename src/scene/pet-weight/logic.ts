import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { isEmpty } from "bme-utils";
import { MIN_6MONTHS, MIN_MONTHS, MIN_WEEKS, MIN_YEARS, PetWeightFilter } from "./filter";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPets, selectPetsMyError, selectPetsMyStatus } from "../../store/pets.slice";
import {
  petsWeightActions,
  selectPetsWeightData,
  selectPetsWeightError,
  selectPetsWeightStatus,
} from "../../store/petsWeight.slice";
import { selectProfileData } from "../../store/profile.slice";
import { dateDifference } from "../../utils";

const useLogic = () => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const petId = String(router.query.petId);

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsSingle = useAppSelector(selectPets(petId));
  const storePetsWeightStatus = useAppSelector(selectPetsWeightStatus);
  const storePetsWeightError = useAppSelector(selectPetsWeightError);
  const storePetsWeightData = useAppSelector(selectPetsWeightData);
  const storeProfileData = useAppSelector(selectProfileData);

  const isAnyPending = [storePetsMyStatus, storePetsWeightStatus].some((status) => status === "pending");
  const isAnyError = [storePetsMyStatus, storePetsWeightStatus].some((status) => status === "error");
  const errorMessages = [storePetsMyError, storePetsWeightError].filter(Boolean) as string[];

  const [filter, setFilter] = useState<PetWeightFilter>("all");
  const filteredData =
    storePetsWeightData?.filter((entry) => {
      const today = new Date();

      const dateDiff = dateDifference(entry.date, today, false);

      if (filter === "all") {
        return true;
      } else if (filter === "y") {
        return dateDiff.years <= MIN_YEARS;
      } else if (filter === "6m") {
        return dateDiff.months <= MIN_6MONTHS;
      } else if (filter === "m") {
        return dateDiff.months <= MIN_MONTHS;
      } else if (filter === "w") {
        return dateDiff.weeks <= MIN_WEEKS;
      }

      return false;
    }) || null;

  const handleUpdatePets = useCallback(() => {
    if (!storePetsSingle) {
      dispatch(petsActions.get());
    }
  }, [storePetsSingle]);

  const handleUpdatePetsWeight = useCallback(() => {
    dispatch(petsWeightActions.get({ petId }));
  }, [petId]);

  const handleTryAgain = () => {
    handleUpdatePets();
    handleUpdatePetsWeight();
  };

  useEffect(() => {
    if (petId) {
      handleUpdatePetsWeight();
    }
  }, [petId, handleUpdatePetsWeight]);

  useEffect(() => {
    handleUpdatePets();
  }, [handleUpdatePets]);

  return {
    petSingle: storePetsSingle,
    weightData: filteredData,
    weightUnit: storeProfileData?.weightUnit,

    isPending: isAnyPending,
    isError: isAnyError,
    errorMessages: !isEmpty(errorMessages) ? errorMessages : [intl.formatMessage({ id: "error.generic_fetch" })],

    tryAgain: handleTryAgain,
    weightFilter: filter,
    setWeightFilter: setFilter,

    petId,
  };
};

export default useLogic;
