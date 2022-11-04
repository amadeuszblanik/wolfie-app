import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { PetsAvatarChangePayload } from "../payload/pets-avatar-change.payload";
import { QueryKeys } from "../keys";

const usePetsAvatarChange = () => {
  const queryClient = useQueryClient();
  const intl = useIntl();

  const [data, setData] = useState<string>();
  const [error, setError] = useState<CommonErrorResponseModel>();
  const [status, setStatus] = useState<ApiStatesTypes>(ApiStatesTypes.Idle);

  const { isLoading, isError, isSuccess, mutate } = useMutation(
    ({ id, body }: { id: string; body: PetsAvatarChangePayload }) =>
      new ApiClient(intl.locale).petsAvatarChange(id, body),
    {
      onSuccess: (response) => {
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
      onSettled: () => queryClient.invalidateQueries([QueryKeys.Pet]),
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
