import { ApiStatesTypes } from "../types/api-states.types";

const getQueryStatusUtils = (
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  isIdle: boolean,
  isPaused: boolean,
  response: any,
  error: any,
): ApiStatesTypes => {
  if (isLoading) {
    return ApiStatesTypes.Loading;
  }

  if (isError) {
    return ApiStatesTypes.Error;
  }

  if (isSuccess) {
    if (response) {
      return ApiStatesTypes.Success;
    }

    if (error) {
      return ApiStatesTypes.Error;
    }

    return ApiStatesTypes.Success;
  }

  if (isIdle) {
    return ApiStatesTypes.Idle;
  }

  if (isPaused) {
    return ApiStatesTypes.Paused;
  }

  return ApiStatesTypes.Init;
};

export default getQueryStatusUtils;
