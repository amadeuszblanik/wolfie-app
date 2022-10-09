import React from "react";
import { ApiStatesTypes } from "../../types/api-states.types";
import { ComponentErrorScreen } from "../index";
import { CommonErrorResponseModel } from "../../api/response-model/common-error.response-model";
import { DoggoLoader } from "../../ui-components";

type ErrorArraySingle = CommonErrorResponseModel | undefined;

interface Props {
  children: React.ReactNode;
  error: CommonErrorResponseModel | ErrorArraySingle[] | undefined;
  status: ApiStatesTypes | ApiStatesTypes[];
  idleLoader?: boolean;
  onTryAgain?: () => void;
}

const Component: React.FunctionComponent<Props> = ({ children, status, error, idleLoader, onTryAgain }) => {
  const statuses: ApiStatesTypes[] = Array.isArray(status) ? status : [status];
  const errors: ErrorArraySingle[] = Array.isArray(error) ? error : [error];

  if (statuses.some((apiStatus) => apiStatus === ApiStatesTypes.Loading)) {
    return <DoggoLoader fullScreen />;
  }

  if (statuses.every((apiStatus) => apiStatus === ApiStatesTypes.Success)) {
    return <>{children}</>;
  }

  if (statuses.some((apiStatus) => apiStatus === ApiStatesTypes.Error)) {
    return (
      <>
        {errors.filter(Boolean).map((errorData, index) => (
          <ComponentErrorScreen key={index} message={errorData?.message} onTryAgain={onTryAgain} />
        ))}
      </>
    );
  }

  if (!idleLoader) {
    return <>{children}</>;
  }

  return <DoggoLoader fullScreen />;
};

export default Component;
