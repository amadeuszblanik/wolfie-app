import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

const useResetPasswordStep0 = (userEmail: string) => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<CommonMessageResponseModel>();
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
  } = useQuery(["resetPasswordStep0", userEmail], () => apiClient.resetPasswordStep0(userEmail), {
    enabled: false,
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
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, false, response, error));
  }, [isLoading, isError, isSuccess, isIdle, response, error]);

  return { get, status, response, error };
};

export default useResetPasswordStep0;
