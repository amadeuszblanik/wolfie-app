import { useQuery } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";

const useHealthLogPetSingle = (petId: string, healthLogId: string) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<HealthLogResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const apiClient = new ApiClient(intl.locale);

  const {
    refetch: get,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    data,
    error: queryError,
  } = useQuery(["healthLogPet", petId], () => apiClient.petsHealthLogSingle(petId, healthLogId));

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
  }, [queryError]);

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, false, response, error));
  }, [isLoading, isError, isSuccess, isIdle, response, error]);

  return { get, status, response, error };
};

export default useHealthLogPetSingle;
