import { AuthSignInBody, AuthSignInResponse } from "../types/auth-sign-in.types";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import myPetsDto from "../dto/my-pets.dto";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import responseDto, { ApiResponse } from "../dto/response.dto";
import getPetsDto from "../dto/get-pets.dto";
import { AuthRefreshTokenBody, AuthRefreshTokenResponse } from "../types/auth-refresh-token.types";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";
import getPetsWeightDto from "../dto/get-pets-weight.dto";
import { ConfigPrivateResponseModel } from "../response-model/config-private.response-model";
import getConfigPrivateDto from "../dto/get-config-private.dto";
import { PetWeightAddBody, PetWeightAddResponse } from "../types/pet-weight-add.types";
import { ConfigPublicResponseModel } from "../response-model/config-public.response-model";
import getConfigPublicDto from "../dto/get-config-public.dto";
import { PetsAddResponseModel } from "../response-model/pets-add.response-model";
import { PetsAddPayload } from "../payload/pets-add.payload";
import { PetsUpdatePayload } from "../payload/pets-update.payload";
import { PetsEditResponseModel } from "../response-model/pets-edit.response-model";

type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE";

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
    process.env.NODE_ENV === "production" ? "https://doggo.rocks/api" : "http://192.168.1.50:3000/api";

  constructor(private readonly language: string) {}

  public signIn = async (body: AuthSignInBody): Promise<AuthSignInResponse | CommonErrorResponseModel> => {
    return this.post("/auth/sign-in", body);
  };

  public configPublic = async (): Promise<ApiResponse<ConfigPublicResponseModel>> => {
    return this.get<ConfigPublicResponseModel>("/config").then((response) => responseDto(response, getConfigPublicDto));
  };

  public configPrivate = async (): Promise<ApiResponse<ConfigPrivateResponseModel>> => {
    return this.get<ConfigPrivateResponseModel>("/config/private").then((response) =>
      responseDto(response, getConfigPrivateDto),
    );
  };

  public petsMy = async (): Promise<ApiResponse<PetSingleResponseModel[]>> => {
    return this.get<PetSingleResponseModel[]>("/pets/my").then((response) => responseDto(response, myPetsDto));
  };

  public petsAdd = async (body: PetsAddPayload): Promise<ApiResponse<PetsAddResponseModel>> => {
    return this.post<PetsAddResponseModel, PetsAddPayload>("/pets/add", body).then((response) =>
      responseDto(response, getPetsDto),
    );
  };

  public petsEdit = async (id: string, body: PetsUpdatePayload): Promise<ApiResponse<PetsEditResponseModel>> => {
    return this.put<PetsEditResponseModel, PetsUpdatePayload>(`/pets/${id}`, body).then((response) =>
      responseDto(response, getPetsDto),
    );
  };

  public petsSingle = (id: string) => async (): Promise<ApiResponse<PetSingleResponseModel>> => {
    return this.get<PetSingleResponseModel>(`/pets/${id}`).then((response) => responseDto(response, getPetsDto));
  };

  public petsWeight = (id: string) => async (): Promise<ApiResponse<WeightValueResponseModel[]>> => {
    return this.get<WeightValueResponseModel[]>(`/pets/${id}/weight?last=ALL`).then((response) =>
      responseDto(response, getPetsWeightDto),
    );
  };

  public petsWeightAdd =
    (id: string) =>
    async (body: PetWeightAddBody): Promise<PetWeightAddResponse | CommonErrorResponseModel> => {
      return this.post(`/pets/${id}/weight`, body);
    };

  public refreshToken = (body: AuthRefreshTokenBody) => async (): Promise<ApiResponse<AuthRefreshTokenResponse>> => {
    return this.post<AuthRefreshTokenResponse, AuthRefreshTokenBody>(`/auth/refresh-token`, body).then((response) =>
      responseDto(response),
    );
  };

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append("Accept-Language", this.language);
    headers.append("Content-Type", "application/json");
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

          return response;
        }

        const { success, error } = await this.refreshToken({ refreshToken })();

        if (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }

        if (success) {
          localStorage.setItem("accessToken", success.accessToken);
          localStorage.setItem("refreshToken", success.refreshToken);

          return fetch(url, {
            method,
            headers: this.getHeaders(),
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
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));
    return interceptResponse.json();
  }

  private async put<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));
    return interceptResponse.json();
  }
}
