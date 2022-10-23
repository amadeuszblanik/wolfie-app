import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ApiClient from "../client";
import { ApiStatesTypes } from "../../types/api-states.types";
import { useIntl } from "react-intl";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import { PetsUpdatePayload } from "../payload/pets-update.payload";
import { getQueryStatus } from "../../utils";
import { PetsEditResponseModel } from "../response-model/pets-edit.response-model";

const useQueries = (id: string) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(ApiStatesTypes.Init);
  const [response, setResponse] = useState<PetsEditResponseModel>();
  const [error, setError] = useState<CommonErrorResponseModel>();

  const { mutate, isLoading, isError, isSuccess, isIdle, isPaused } = useMutation(
    (body: PetsUpdatePayload) => new ApiClient(intl.locale).putPetsById(id, body),
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
      onSettled: () => {
        void queryClient.invalidateQueries("resetPasswordStep1");
      },
    },
  );

  useEffect(() => {
    setStatus(getQueryStatus(isLoading, isError, isSuccess, isIdle, isPaused, response, error));
  }, [isLoading, isError, isSuccess, isIdle, isPaused, response, error]);

  const put = (body: PetsUpdatePayload) => {
    setResponse(undefined);
    setError(undefined);

    void mutate(body);
  };

  return { put, status, response, error };
};

export default useQueries;
