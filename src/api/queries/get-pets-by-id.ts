import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { getQueryStatus } from "../../utils";
import { QueryKeys } from "../keys";

const useQueries = (id: string, enabled = true) => {
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
    isStale,
    data,
    error: queryError,
  } = useQuery([QueryKeys.Pet, QueryKeys.PetSingle, id], () => apiClient.getPetsById(id), {
    enabled: enabled && !!id,
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
  }, [queryError]);

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isStale, false, response, error));
  }, [isLoading, isError, isSuccess, isStale, response, error]);

  const get = () => {
    setResponse(undefined);
    setError(undefined);

    void refetch();
  };

  return { get, status, response, error };
};

export default useQueries;
