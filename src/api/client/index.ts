import FormData from "form-data";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import myPetsDto from "../dto/my-pets.dto";
import responseDto, { ApiResponse } from "../dto/response.dto";
import getPetsDto from "../dto/get-pets.dto";
import { AuthRefreshTokenBody, AuthRefreshTokenResponse } from "../types/auth-refresh-token.types";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";
import getPetsWeightDto from "../dto/get-pets-weight.dto";
import { PetsAddResponseModel } from "../response-model/pets-add.response-model";
import { PetsAddPayload } from "../payload/pets-add.payload";
import { PetsUpdatePayload } from "../payload/pets-update.payload";
import { PetsEditResponseModel } from "../response-model/pets-edit.response-model";
import { PetsAvatarChangePayload } from "../payload/pets-avatar-change.payload";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";
import { SignUpPayload } from "../payload/sign-up.payload";
import { GdprResponseModel } from "../response-model/gdpr.response-model";
import getGdprDto from "../dto/get-gdpr.dto";
import { ConfirmEmailPayload } from "../payload/confirm-email.payload";
import { SignInPayload } from "../payload/sign-in.payload";
import { SignInResponseModel } from "../response-model/sign-in.response-model";
import { ResetPasswordStep1Payload } from "../payload/reset-password-step-1.payload";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import getHealthLogDto from "../dto/get-health-log.dto";
import { ShortMedicineResponseModel } from "../response-model/short-medicine.response-model";
import { HealthLogAddPayload } from "../payload/health-log-add.payload";
import getHealthLogSingleDto from "../dto/get-health-log-single.dto";
import profileDto from "../dto/profile.dto";
import { ProfileResponseModel } from "../response-model/profile.response-model";
import { ProfilePayload } from "../payload/profile.payload";
import { ChangePasswordPayload } from "../payload/change-password.payload";
import { RefreshTokenResponseModel } from "../response-model/refresh-token.response-model";
import refreshTokenDto from "../dto/refresh-token.dto";
import { Breed } from "../../types/breed.types";
import breedsDto from "../dto/breeds.dto";
import { PetWeightAddPayload } from "../payload/pet-weight-add.payload";
import getPetsWeightSingleDto from "../dto/get-pets-weight-single.dto";
import { ConfigResponseModel } from "../response-model/config.response-model";
import getConfigDto from "../dto/get-config.dto";
import { FcmTokenPayload } from "../payload/fcm-token.payload";

type HTTP_METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export default class ApiClient {
  private readonly baseUrl: string =
    process.env.NODE_ENV === "production" ? "https://api.wolfie.app/v1" : "http://192.168.1.50:3000/v1";

  constructor(private readonly language: string) {}

  public signIn = async (body: SignInPayload): Promise<ApiResponse<SignInResponseModel>> =>
    this.post<SignInResponseModel, SignInPayload>("/auth/sign-in", body).then((response) => responseDto(response));

  public signUp = async (body: SignUpPayload): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.post<CommonMessageResponseModel, SignUpPayload>("/auth/sign-up", body).then((response) =>
      responseDto(response),
    );

  public confirmEmail = async (body: ConfirmEmailPayload): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.post<CommonMessageResponseModel, ConfirmEmailPayload>("/auth/confirm-email", body).then((response) =>
      responseDto(response),
    );

  public resetPasswordStep0 = async (userEmail: string): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.get<CommonMessageResponseModel>(`/auth/reset-password?user-email=${userEmail}`).then((response) =>
      responseDto(response),
    );

  public resetPasswordStep1 = async (
    body: ResetPasswordStep1Payload,
  ): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.put<CommonMessageResponseModel, ResetPasswordStep1Payload>("/auth/reset-password", body).then((response) =>
      responseDto<CommonMessageResponseModel>(response as CommonMessageResponseModel),
    );

  public gdpr = async (): Promise<ApiResponse<GdprResponseModel>> =>
    this.get<GdprResponseModel>("/gdpr").then((response) => responseDto(response, getGdprDto));

  public profile = async (): Promise<ApiResponse<ProfileResponseModel>> =>
    this.get<ProfileResponseModel>(`/auth/profile`).then((response) => responseDto(response, profileDto));

  public updateProfile = async (body: ProfilePayload): Promise<ApiResponse<ProfileResponseModel>> =>
    this.put<ProfileResponseModel, ProfilePayload>(`/auth/profile`, body).then((response) =>
      responseDto(response, profileDto),
    );

  public changePassword = async (body: ChangePasswordPayload): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.put<CommonMessageResponseModel, ChangePasswordPayload>(`/auth/change-password`, body).then((response) =>
      responseDto(response),
    );

  public authorizedDevices = async (): Promise<ApiResponse<RefreshTokenResponseModel>> =>
    this.get<RefreshTokenResponseModel>(`/auth/refresh-token`).then((response) =>
      responseDto(response, refreshTokenDto),
    );

  public postFcmToken = async (body: FcmTokenPayload): Promise<ApiResponse<PetsAddResponseModel>> =>
    this.post<PetsAddResponseModel, FcmTokenPayload>("/auth/fcm-token", body).then((response) => responseDto(response));

  public postTestNotification = async (): Promise<ApiResponse<PetsAddResponseModel>> =>
    this.post<PetsAddResponseModel, undefined>("/auth/test-notification", undefined).then((response) =>
      responseDto(response),
    );

  public getConfig = async (): Promise<ApiResponse<ConfigResponseModel>> =>
    this.get<ConfigResponseModel>("/config").then((response) => responseDto(response, getConfigDto));

  public getPetsMy = async (): Promise<ApiResponse<PetSingleResponseModel[]>> =>
    this.get<PetSingleResponseModel[]>("/pets/my").then((response) => responseDto(response, myPetsDto));

  public medicineShortList = async (): Promise<ApiResponse<ShortMedicineResponseModel[]>> =>
    this.get<ShortMedicineResponseModel[]>("/medicine").then((response) => responseDto(response));

  public getBreed = async (): Promise<ApiResponse<Breed[]>> =>
    this.get<Breed[]>("/breed").then((response) => responseDto(response, breedsDto));

  public getPetsById = (id: string): Promise<ApiResponse<PetSingleResponseModel>> =>
    this.get<PetSingleResponseModel>(`/pets/${id}`).then((response) => responseDto(response, getPetsDto));

  public petsAvatarChange = async (id: string, body: PetsAvatarChangePayload): Promise<ApiResponse<string>> =>
    this.postForm<string, PetsAvatarChangePayload>(`/pets/${id}/avatar`, body).then((response) =>
      responseDto(response),
    );

  public postPetsAdd = async (body: PetsAddPayload): Promise<ApiResponse<PetsAddResponseModel>> =>
    this.post<PetsAddResponseModel, PetsAddPayload>("/pets/add", body).then((response) =>
      responseDto(response, getPetsDto),
    );

  public putPetsById = async (id: string, body: PetsUpdatePayload): Promise<ApiResponse<PetsEditResponseModel>> =>
    this.put<PetsEditResponseModel, PetsUpdatePayload>(`/pets/${id}`, body).then((response) =>
      responseDto(response, getPetsDto),
    );

  public getPetWeightById = (id: string): Promise<ApiResponse<WeightValueResponseModel[]>> =>
    this.get<WeightValueResponseModel[]>(`/pets/${id}/weight?last=ALL`).then((response) =>
      responseDto(response, getPetsWeightDto),
    );

  public deletePetWeightById = (id: string, weightId: string): Promise<ApiResponse<CommonMessageResponseModel>> =>
    this.delete<CommonMessageResponseModel>(`/pets/${id}/weight/${weightId}`).then((response) => responseDto(response));

  public getPetWeightSingleById = (id: string, weightId: string): Promise<ApiResponse<WeightValueResponseModel>> =>
    this.get<WeightValueResponseModel>(`/pets/${id}/weight/${weightId}`).then((response) =>
      responseDto(response, getPetsWeightSingleDto),
    );

  public patchPetWeightSingleById = (
    id: string,
    weightId: string,
    payload: PetWeightAddPayload,
  ): Promise<ApiResponse<WeightValueResponseModel>> =>
    this.patch<WeightValueResponseModel, PetWeightAddPayload>(`/pets/${id}/weight/${weightId}`, payload).then(
      (response) => responseDto(response, getPetsWeightSingleDto),
    );

  public petsHealthLog = async (id: string): Promise<ApiResponse<HealthLogResponseModel[]>> =>
    this.get<HealthLogResponseModel[]>(`/pets/${id}/health-log`).then((response) =>
      responseDto(response, getHealthLogDto),
    );

  public petsHealthLogSingle = async (id: string, healthLogId: string): Promise<ApiResponse<HealthLogResponseModel>> =>
    this.get<HealthLogResponseModel>(`/pets/${id}/health-log/${healthLogId}`).then((response) =>
      responseDto(response, getHealthLogSingleDto),
    );

  public petsHealthLogAdd = async (
    id: string,
    payload: HealthLogAddPayload,
  ): Promise<ApiResponse<HealthLogResponseModel>> =>
    this.post<HealthLogResponseModel, HealthLogAddPayload>(`/pets/${id}/health-log`, payload).then((response) =>
      responseDto(response),
    );

  public postPetsWeightById = async (
    id: string,
    payload: PetWeightAddPayload,
  ): Promise<ApiResponse<WeightValueResponseModel>> =>
    this.post<WeightValueResponseModel, PetWeightAddPayload>(`/pets/${id}/weight`, payload).then((response) =>
      responseDto(response),
    );

  public refreshToken = (body: AuthRefreshTokenBody) => async (): Promise<ApiResponse<AuthRefreshTokenResponse>> =>
    this.post<AuthRefreshTokenResponse, AuthRefreshTokenBody>(`/auth/refresh-token`, body).then((response) =>
      responseDto(response),
    );

  private getHeaders(contentType?: string): Headers {
    const headers = new Headers();
    headers.append("Accept-Language", this.language);
    if (contentType) {
      headers.append("Content-Type", contentType);
    }
    headers.append("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);

    return headers;
  }

  private interceptors = async (
    response: Response,
    method: HTTP_METHOD,
    url: string,
    body?: BodyInit | null,
  ): Promise<Response> => {
    switch (response.status) {
      case STATUS_CODES.UNAUTHORIZED:
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.dispatchEvent(new Event("authSignIn"));

          // @TODO: Refactor it later
          if (location && !location.pathname.startsWith("/auth")) {
            location.href = "/auth/sign-in?unauthorized";
          }

          return response;
        }

        const { success, error } = await this.refreshToken({ refreshToken })();

        if (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.dispatchEvent(new Event("authSignIn"));
        }

        if (success) {
          localStorage.setItem("accessToken", success.accessToken);
          localStorage.setItem("refreshToken", success.refreshToken);

          window.dispatchEvent(new Event("authSignIn"));

          return fetch(url, {
            method,
            headers: this.getHeaders("application/json"),
            body,
          });
        }

        return response;
    }

    return response;
  };

  private async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, { headers: this.getHeaders() });
    const interceptResponse = await this.interceptors(response, "GET", path);

    return interceptResponse.json();
  }

  private async post<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  private async postForm<T, B>(path: string, body: B): Promise<T> {
    const formData = new FormData();

    if (body instanceof Object) {
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: formData as unknown as BodyInit,
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  private async put<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  private async patch<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "PATCH", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  private async delete<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, { headers: this.getHeaders(), method: "DELETE" });
    const interceptResponse = await this.interceptors(response, "DELETE", path);

    return interceptResponse.json();
  }
}
