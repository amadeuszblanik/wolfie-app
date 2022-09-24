import { CommonErrorResponseModel } from "../response-model/common-error.response-model";

export interface ApiResponse<T> {
  success: T | null;
  error: CommonErrorResponseModel | null;
}

const responseDto = <T>(data: T | CommonErrorResponseModel, successDto: (data: T) => T): ApiResponse<T> => {
  if ("error" in data) {
    return { success: null, error: data as CommonErrorResponseModel };
  }
  return { success: successDto(data as T), error: null };
};

export default responseDto;
