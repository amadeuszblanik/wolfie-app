import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { getQueryStatus } from "../../utils";

const useQueries = (id: string) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<PetSingleResponseModel>();
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
  } = useQuery(["[GET] pets/:id", id], () => apiClient.getPetsById(id));

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
    setStatus(ApiStatesTypes.Loading);
    setResponse(undefined);
    setError(undefined);

    void refetch();
  };

  return { get, status, response, error };
};

export default useQueries;
