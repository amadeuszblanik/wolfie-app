import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";

const useSignIn = () => {
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    ({ username, password }: { username: string; password: string }) => new ApiClient().signIn(username, password),
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
