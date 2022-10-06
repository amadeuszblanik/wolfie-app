import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";
import { SignInPayload } from "../payload/sign-in.payload";
import { SignInResponseModel } from "../response-model/sign-in.response-model";

const useSignIn = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<SignInResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const {
    mutate: post,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isPaused,
  } = useMutation((body: SignInPayload) => new ApiClient(intl.locale).signIn(body), {
    onSuccess: (data) => {
      setResponse(data.success);
      setError(data.error);

      if (data.success) {
        localStorage.setItem("accessToken", data.success.accessToken);
        if (data.success.refreshToken) {
          localStorage.setItem("refreshToken", data.success.refreshToken);
        }
      }
    },
    onError: () => {
      setError({
        statusCode: NaN,
        error: intl.formatMessage({ id: "error.api_unknown_error" }),
        message: intl.formatMessage({ id: "error.api_unknown_message" }),
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries("signIn");
    },
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  return { post, status, response, error };
};

export default useSignIn;
