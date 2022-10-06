import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";
import { ResetPasswordStep1Payload } from "../payload/reset-password-step-1.payload";

const useResetPasswordStep1 = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<CommonMessageResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const {
    mutate: post,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isPaused,
  } = useMutation((body: ResetPasswordStep1Payload) => new ApiClient(intl.locale).resetPasswordStep1(body), {
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
    onSettled: () => {
      void queryClient.invalidateQueries("resetPasswordStep1");
    },
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  return { post, status, response, error };
};

export default useResetPasswordStep1;
