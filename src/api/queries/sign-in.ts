import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { AuthSignInBody } from "../types/auth-sign-in.types";
import { useDeviceName } from "../../hooks";
import { useIntl } from "react-intl";

const useSignIn = () => {
  const queryClient = useQueryClient();
  const deviceName = useDeviceName();
  const intl = useIntl();

  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    (body: AuthSignInBody) => {
      return new ApiClient(intl.locale).signIn({ ...body, device: deviceName });
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["signIn"]);

        if ("accessToken" in response) {
          setAccessToken(response.accessToken);
        } else {
          setAccessToken(undefined);
        }

        if ("refreshToken" in response) {
          setRefreshToken(response.refreshToken);
        } else {
          setRefreshToken(undefined);
        }

        if ("error" in response && "message" in response) {
          setErrorMessage(response.message);
        } else {
          setErrorMessage(undefined);
        }
      },
      onError: (error) => {
        setAccessToken(undefined);
        setRefreshToken(undefined);
      },
    },
  );

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
      setStatus(errorMessage ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, errorMessage]);

  return { accessToken, refreshToken, mutate, isLoading, isError, isSuccess, status, errorMessage };
};

export default useSignIn;
