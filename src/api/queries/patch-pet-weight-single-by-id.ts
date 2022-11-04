import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { getQueryStatus } from "../../utils";
import { PetWeightAddPayload } from "../payload/pet-weight-add.payload";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";
import { QueryKeys } from "../keys";

const useQueries = (id: string, weightId: string) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<WeightValueResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const { mutate, isLoading, isError, isSuccess, isIdle, isPaused } = useMutation(
    (body: PetWeightAddPayload) => new ApiClient(intl.locale).patchPetWeightSingleById(id, weightId, body),
    {
      onSuccess: (data) => {
        setResponse(data.success);
        setError(data.error);
      },
      onError: () => {
        setError({
          statusCode: NaN,
          error: intl.formatMessage({ id: "error.api_unknown_error" }),
          message: intl.formatMessage({ id: "error.api_unknown_message" }),
        });
      },
      onSettled: () => queryClient.invalidateQueries([QueryKeys.Pet]),
    },
  );

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  const patch = (body: PetWeightAddPayload) => {
    setResponse(undefined);
    setError(undefined);

    void mutate(body);
  };

  return { patch, status, response, error };
};

export default useQueries;
