import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { PetWeightAddBody } from "../types/pet-weight-add.types";

const usePetWeightAdd = (id: string) => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  const [data, setData] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    (body: PetWeightAddBody) => {
      return new ApiClient(intl.locale).petsWeightAdd(id)(body);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["signIn"]);

        if (response instanceof Boolean) {
          setData(true);
          return;
        }

        if (response instanceof Object && "error" in response && "message" in response) {
          setErrorMessage(response.message);
        } else {
          setErrorMessage(undefined);
        }
      },
      onError: (error) => {
        setData(false);
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

  return { data, mutate, isLoading, isError, isSuccess, status, errorMessage };
};

export default usePetWeightAdd;
