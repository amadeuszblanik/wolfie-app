import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { SignUpPayload } from "../payload/sign-up.payload";
import { QueryKeys } from "../keys";

const useSignUp = () => {
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
  } = useMutation((body: SignUpPayload) => new ApiClient(intl.locale).signUp(body), {
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
    onSettled: () => queryClient.invalidateQueries(QueryKeys.Auth.all()),
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  return { post, status, response, error };
};

export default useSignUp;
