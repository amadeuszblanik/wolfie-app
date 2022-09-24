import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

const usePetsSingle = (id: string) => {
  const intl = useIntl();

  const apiClient = new ApiClient(intl.locale);

  const [pet, setPet] = useState<PetSingleResponseModel | undefined>();
  const [petError, setPetError] = useState<CommonErrorResponseModel | undefined>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery(["fetchPetsSingle", id], apiClient.petsSingle(id));

  useEffect(() => {
    if (isLoading) {
      setStatus(ApiStatesTypes.Loading);
      return;
    }

    if (isError) {
      console.warn("Here!!!");
      setStatus(ApiStatesTypes.Error);
      return;
    }

    if (isSuccess) {
      console.warn("Here 20 !!!");
      setStatus(petError ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      setPet(data?.success ?? undefined);
      setPetError(data?.error ?? undefined);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, data]);

  return { pet, petError, isLoading, isError, isSuccess, status, refetch };
};

export default usePetsSingle;
