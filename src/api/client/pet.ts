import ApiClientBase from "./base";
import responseDto, { ApiResponse } from "../dto/response.dto";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import getHealthLogDto from "../dto/get-health-log.dto";
import getHealthLogSingleDto from "../dto/get-health-log-single.dto";
import { HealthLogAddPayload } from "../payload/health-log-add.payload";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";

export default class ApiClientPet extends ApiClientBase {
  // Health Log
  public getHealthLog = async (petId: string): Promise<ApiResponse<HealthLogResponseModel[]>> =>
    this.get<HealthLogResponseModel[]>(`/pets/${petId}/health-log`).then((response) =>
      responseDto(response, getHealthLogDto),
    );

  public getHealthLogById = async (petId: string, healthLogId: string): Promise<ApiResponse<HealthLogResponseModel>> =>
    this.get<HealthLogResponseModel>(`/pets/${petId}/health-log/${healthLogId}`).then((response) =>
      responseDto(response, getHealthLogSingleDto),
    );

  public postHealthLog = async (
    petId: string,
    payload: HealthLogAddPayload,
  ): Promise<ApiResponse<HealthLogResponseModel>> =>
    this.post<HealthLogResponseModel, HealthLogAddPayload>(`/pets/${petId}/health-log`, payload).then((response) =>
      responseDto(response),
    );

  public deleteHealthLog = async (
    petId: string,
    healthLogId: string,
  ): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.delete(`/pets/${petId}/health-log/${healthLogId}`).then((response) => responseDto(response));
}
