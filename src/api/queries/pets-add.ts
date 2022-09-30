import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { PetsAddPayload } from "../payload/pets-add.payload";
import { PetsAddResponseModel } from "../response-model/pets-add.response-model";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

const usePetsAdd = () => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  const [data, setData] = useState<PetsAddResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    (body: PetsAddPayload) => {
      return new ApiClient(intl.locale).petsAdd(body);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["signIn"]);

        if ("success" in response) {
          setData(response.success);
        } else {
          setData(undefined);
        }

        if ("error" in response) {
          setError(response.error);
        } else {
          setError(undefined);
        }
      },
      onError: () => {
        setData(undefined);
        setError(undefined);
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
      setStatus(error ? ApiStatesTypes.Error : ApiStatesTypes.Success);
      return;
    }

    setStatus(ApiStatesTypes.Idle);
  }, [isLoading, isError, isSuccess, data, error]);

  return { data, error, status, mutate, isLoading, isError, isSuccess };
};

export default usePetsAdd;
