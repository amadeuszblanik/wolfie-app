import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { ProfileResponseModel } from "../response-model/profile.response-model";
import { QueryKeys } from "../keys";

const useProfile = () => {
  const intl = useIntl();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<ProfileResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const apiClient = new ApiClient(intl.locale);

  const {
    refetch: get,
    isLoading,
    isError,
    isSuccess,
    isStale,
    data,
    error: queryError,
  } = useQuery([QueryKeys.Auth, QueryKeys.AuthProfile], () => apiClient.profile());

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

  return { get, status, response, error };
};

export default useProfile;
