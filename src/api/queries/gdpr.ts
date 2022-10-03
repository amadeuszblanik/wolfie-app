import { useMutation, useQuery, useQueryClient } from "react-query";
import ApiClient from "../client";
import { useEffect, useState } from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { getQueryStatus } from "../../utils";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { useIntl } from "react-intl";
import { SignUpPayload } from "../payload/sign-up.payload";
import { GdprResponseModel } from "../response-model/gdpr.response-model";

const useGdpr = () => {
  const intl = useIntl();

  const {
    data,
    refetch: get,
    isLoading,
    isError,
    isSuccess,
    isIdle,
  } = useQuery("fetchMyPets", new ApiClient(intl.locale).gdpr);

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<GdprResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  useEffect(() => {
    setResponse(data?.success);
    setError(data?.error);
  }, [data]);

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, false, response, error));
  }, [isLoading, isError, isSuccess]);

  return { get, status, response, error };
};

export default useGdpr;
