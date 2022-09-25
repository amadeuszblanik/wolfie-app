import { AuthSignInBody, AuthSignInResponse } from "../types/auth-sign-in.types";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import myPetsDto from "../dto/my-pets.dto";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import responseDto, { ApiResponse } from "../dto/response.dto";
import getPetsDto from "../dto/get-pets.dto";
import { AuthRefreshTokenBody, AuthRefreshTokenResponse } from "../types/auth-refresh-token.types";

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
  private readonly baseUrl: string = "http://localhost:3000/api";

  constructor(private readonly language: string) {}

  public signIn = async (body: AuthSignInBody): Promise<AuthSignInResponse | CommonErrorResponseModel> => {
    return this.post("/auth/sign-in", body);
  };

  public petsMy = async (): Promise<ApiResponse<PetSingleResponseModel[]>> => {
    return this.get<PetSingleResponseModel[]>("/pets/my").then((response) => responseDto(response, myPetsDto));
  };

  public petsSingle = (id: string) => async (): Promise<ApiResponse<PetSingleResponseModel>> => {
    return this.get<PetSingleResponseModel>(`/pets/${id}`).then((response) => responseDto(response, getPetsDto));
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
}
