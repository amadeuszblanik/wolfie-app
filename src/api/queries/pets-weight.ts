import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";

const usePetsWeight = (id: string) => {
  const intl = useIntl();

  const apiClient = new ApiClient(intl.locale);

  const [petsWeight, setPetsWeight] = useState<WeightValueResponseModel[] | undefined>();
  const [petsWeightError, setPetsWeightError] = useState<CommonErrorResponseModel | undefined>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery(["fetchPetWeights", id], apiClient.petsWeight(id));

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
      setStatus(petsWeightError ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      setPetsWeight(data?.success ?? undefined);
      setPetsWeightError(data?.error ?? undefined);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, petsWeightError]);

  return { petsWeight, petsWeightError, isLoading, isError, isSuccess, status, refetch };
};

export default usePetsWeight;
