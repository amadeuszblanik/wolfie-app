import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { getQueryStatus } from "../../utils";
import { ApiResponse } from "../dto/response.dto";

interface GetOptions {
  enabled?: boolean;
}

type MutateFunction = (...args: any[]) => void;

const useGet = <ResponseType>(
  queryKeys: string[],
  fetchFunction: () => Promise<ApiResponse<ResponseType>>,
  options?: GetOptions,
) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<ResponseType>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    isRefetching,
    data,
    error: queryError,
  } = useQuery(
    queryKeys,
    fetchFunction,
    options && {
      enabled: options.enabled,
    },
  );
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
    setStatus(
      getQueryStatus(isLoading || isFetching || isRefetching, isError, isSuccess, false, false, response, error),
    );
  }, [isLoading, isFetching, isRefetching, isError, isSuccess, response, error]);

  const request = useCallback(() => {
    setResponse(undefined);
    setError(undefined);

    void refetch();
  }, [setResponse, setError, refetch]);

  return { request, status, response, error };
};

const useMutate = <ResponseType, RequestPayload>(
  queryKeys: string[],
  fetchFunction: (data: RequestPayload) => Promise<ApiResponse<ResponseType>>,
  invalidateQueryKeys: string[][] = [],
) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<ResponseType>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const { mutate, isLoading, isError, isSuccess, isIdle, isPaused } = useMutation(fetchFunction, {
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
    onSettled: () => invalidateQueryKeys.forEach((key) => void queryClient.invalidateQueries(key)),
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  const request: MutateFunction = (payload): void => {
    setResponse(undefined);
    setError(undefined);

    void mutate(payload);
  };

  return { request, status, response, error };
};

const queriesBase = {
  get: useGet,
  post: useMutate,
  put: useMutate,
  patch: useMutate,
  delete: useMutate,
};

export default queriesBase;
