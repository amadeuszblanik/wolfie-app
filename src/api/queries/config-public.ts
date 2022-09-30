import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { ConfigPublicResponseModel } from "../response-model/config-public.response-model";

const useConfigPublic = () => {
  const intl = useIntl();

  const apiClient = new ApiClient(intl.locale);

  const [configPublic, setConfigPublic] = useState<ConfigPublicResponseModel | undefined>();
  const [configPublicError, setConfigPublicError] = useState<CommonErrorResponseModel | undefined>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery("fetchConfigPublic", apiClient.configPublic);

  useEffect(() => {
    if (isLoading) {
      setStatus(ApiStatesTypes.Loading);
      return;
    }

    if (isError) {
      setStatus(ApiStatesTypes.Error);
      return;
    }

    if (isSuccess) {
      setStatus(configPublicError ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      setConfigPublic(data?.success ?? undefined);
      setConfigPublicError(data?.error ?? undefined);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, configPublicError]);

  return { configPublic, configPublicError, isLoading, isError, isSuccess, status, refetch };
};

export default useConfigPublic;
