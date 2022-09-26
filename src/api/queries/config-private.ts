import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { ConfigPrivateResponseModel } from "../response-model/config-private.response-model";

const useConfigPrivate = () => {
  const intl = useIntl();

  const apiClient = new ApiClient(intl.locale);

  const [configPrivate, setConfigPrivate] = useState<ConfigPrivateResponseModel | undefined>();
  const [configPrivateError, setConfigPrivateError] = useState<CommonErrorResponseModel | undefined>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { data, refetch, isLoading, isError, isSuccess } = useQuery("fetchConfigPrivate", apiClient.configPrivate);

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
      setStatus(configPrivateError ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      setConfigPrivate(data?.success ?? undefined);
      setConfigPrivateError(data?.error ?? undefined);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, configPrivateError]);

  return { configPrivate, configPrivateError, isLoading, isError, isSuccess, status, refetch };
};

export default useConfigPrivate;
