import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { PetsAvatarChangePayload } from "../payload/pets-avatar-change.payload";

const usePetsAvatarChange = () => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  const [data, setData] = useState<string>();
  const [error, setError] = useState<CommonErrorResponseModel>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    ({ id, body }: { id: string; body: PetsAvatarChangePayload }) => {
      return new ApiClient(intl.locale).petsAvatarChange(id, body);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["petsAvatarChange"]);

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

export default usePetsAvatarChange;
