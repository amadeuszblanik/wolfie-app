import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";
import { SignUpPayload } from "../payload/sign-up.payload";

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
    onError: (err) => {
      console.error("signUp()::onError:", err);
    },
    onSettled: () => {
      void queryClient.invalidateQueries("signUp");
    },
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  return { post, status, response, error };
};

export default useSignUp;
