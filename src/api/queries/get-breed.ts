import { useQuery } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";
import { Breed } from "../../types/breed.types";

const useQueries = () => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<Breed[]>();
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
  } = useQuery(["[GET] breed"], () => apiClient.getBreed());

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

  const get = () => {
    setResponse(undefined);
    setError(undefined);

    void refetch();
  };

  return { get, status, response, error };
};

export default useQueries;
