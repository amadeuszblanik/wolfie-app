import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { ConfigResponseModel } from "../response-model/config.response-model";
import { getQueryStatus } from "../../utils";
import { DEFAULT_CONFIG_REFETCH } from "../../settings/globals";
import { rsConfig } from "../../reactive-store";

const useQueries = () => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<ConfigResponseModel>();
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
  } = useQuery(["[GET] config"], () => apiClient.getConfig(), {
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    refetchInterval: DEFAULT_CONFIG_REFETCH,
    refetchIntervalInBackground: true,
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
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, false, response, error));
  }, [isLoading, isError, isSuccess, isIdle, response, error]);

  const get = useCallback(() => {
    setResponse(undefined);
    setError(undefined);

    void refetch();
  }, [refetch]);

  useEffect(() => {
    rsConfig.update.subscribe(() => {
      get();
    });
  }, [get]);

  return { get, status, response, error };
};

export default useQueries;
