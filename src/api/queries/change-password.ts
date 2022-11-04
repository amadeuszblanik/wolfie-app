import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { ChangePasswordPayload } from "../payload/change-password.payload";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { QueryKeys } from "../keys";

const useChangePassword = () => {
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
  } = useMutation((body: ChangePasswordPayload) => new ApiClient(intl.locale).changePassword(body), {
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
      void queryClient.invalidateQueries([QueryKeys.Auth]);
      void queryClient.invalidateQueries([QueryKeys.AuthProfile]);
    },
  });

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  return { post, status, response, error };
};

export default useChangePassword;
