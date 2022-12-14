import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { PetsEditResponseModel } from "../response-model/pets-edit.response-model";
import { getQueryStatus } from "../../utils";
import { PetsAddPayload } from "../payload/pets-add.payload";
import { QueryKeys } from "../keys";

const useQueries = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<PetsEditResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const { mutate, isLoading, isError, isSuccess, isIdle, isPaused } = useMutation(
    (body: PetsAddPayload) => new ApiClient(intl.locale).postPetsAdd(body),
    {
      onSuccess: (data) => {
        setResponse(data.success);
        setError(data.error);
      },
      onError: () => {
        setError({
          statusCode: NaN,
          error: intl.formatMessage({ id: "error.api_unknown_error" }),
          message: intl.formatMessage({ id: "error.api_unknown_message" }),
        });
      },
      onSettled: () => queryClient.invalidateQueries(QueryKeys.Pet.list()),
    },
  );

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  const post = (body: PetsAddPayload) => {
    setResponse(undefined);
    setError(undefined);

    void mutate(body);
  };

  return { post, status, response, error };
};

export default useQueries;
