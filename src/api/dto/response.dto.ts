import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

const ERROR_STATUS_CODE_STARTING_AT = 400;

export interface ApiResponse<T> {
  success: T | undefined;
  error: CommonErrorResponseModel | undefined;
}

const responseDto = <T>(data: T | CommonErrorResponseModel, successDto?: (data: T) => T): ApiResponse<T> => {
  if (
    "error" in data ||
    ("statusCode" in data && (data as CommonErrorResponseModel).statusCode >= ERROR_STATUS_CODE_STARTING_AT)
  ) {
    return { success: undefined, error: data as CommonErrorResponseModel };
  }
  return { success: successDto ? successDto(data as T) : (data as T), error: undefined };
};

export default responseDto;
