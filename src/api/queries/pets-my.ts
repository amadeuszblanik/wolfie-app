import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

const usePetsMy = () => {
  const intl = useIntl();

  const apiClient = new ApiClient(intl.locale);

  const [myPets, setMyPets] = useState<PetSingleResponseModel[] | undefined>();
  const [myPetsError, setMyPetsError] = useState<CommonErrorResponseModel | undefined>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery("fetchMyPets", apiClient.petsMy);

  useEffect(() => {
    if (isLoading) {
      setStatus(ApiStatesTypes.Loading);
      return;
    }

    if (isError) {
      setStatus(ApiStatesTypes.Error);
      return;
    }

    if (isSuccess) {
      setStatus(myPetsError ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      setMyPets(data?.success ?? undefined);
      setMyPetsError(data?.error ?? undefined);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, myPetsError]);

  return { myPets, myPetsError, isLoading, isError, isSuccess, status, refetch };
};

export default usePetsMy;
