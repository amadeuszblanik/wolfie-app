import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { getQueryStatus } from "../../utils";
import { PetWeightAddPayload } from "../payload/pet-weight-add.payload";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";
import { rsPetWeight } from "../../reactive-store";

const useQueries = (id: string) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<WeightValueResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const { mutate, isLoading, isError, isSuccess, isIdle, isPaused } = useMutation(
    (body: PetWeightAddPayload) => new ApiClient(intl.locale).postPetsWeightById(id, body),
    {
      onSuccess: (data) => {
        setResponse(data.success);
        setError(data.error);

        if (data.success) {
          rsPetWeight.update.next();
        }
      },
      onError: () => {
        setError({
          statusCode: NaN,
          error: intl.formatMessage({ id: "error.api_unknown_error" }),
          message: intl.formatMessage({ id: "error.api_unknown_message" }),
        });
      },
      onSettled: () => {
        void queryClient.invalidateQueries("/pets/:id/weight");
      },
    },
  );

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  const post = (body: PetWeightAddPayload) => {
    setResponse(undefined);
    setError(undefined);

    void mutate(body);
  };

  return { post, status, response, error };
};

export default useQueries;