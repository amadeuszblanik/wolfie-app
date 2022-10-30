import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";
import { getQueryStatus } from "../../utils";
import { rsPetWeight } from "../../reactive-store";

const useQueries = (id: string, weightId: string) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<WeightValueResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const apiClient = new ApiClient(intl.locale);

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    data,
    error: queryError,
  } = useQuery(["[GET] pets/:id/weight/:weightId", id, weightId], () => apiClient.getPetWeightSingleById(id, weightId));

  useEffect(() => {
    setResponse(data?.success);
    setError(data?.error);
  }, [data]);

  useEffect(() => {
    if (!queryError) {
      return;
    }

    setError({
      statusCode: NaN,
      error: intl.formatMessage({ id: "error.api_unknown_error" }),
      message: intl.formatMessage({ id: "error.api_unknown_message" }),
    });
  }, [queryError, intl]);

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, false, response, error));
  }, [isLoading, isError, isSuccess, isIdle, response, error]);

  const get = useCallback(() => {
    setResponse(undefined);
    setError(undefined);

    void refetch();
  }, [setResponse, setError, refetch]);

  useEffect(() => {
    rsPetWeight.update.subscribe(() => {
      get();
    });
  }, [get]);

  return { get, status, response, error };
};

export default useQueries;
