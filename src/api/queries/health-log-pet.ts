import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { QueryKeys } from "../keys";

const useHealthLogPet = (petId: string) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<HealthLogResponseModel[]>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const apiClient = new ApiClient(intl.locale);

  const {
    refetch: get,
    isLoading,
    isError,
    isSuccess,
    isStale,
    data,
    error: queryError,
  } = useQuery(QueryKeys.Pet.healthLog(petId), () => apiClient.petsHealthLog(petId), {
    enabled: !!petId,
  });

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
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isStale, false, response, error));
  }, [isLoading, isError, isSuccess, isStale, response, error]);

  return { get, status, response, error };
};

export default useHealthLogPet;
