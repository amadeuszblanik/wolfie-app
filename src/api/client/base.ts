import FormData from "form-data";
import responseDto, { ApiResponse } from "../dto/response.dto";
import { AuthRefreshTokenBody, AuthRefreshTokenResponse } from "../types/auth-refresh-token.types";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";

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

export default class ApiClientBase {
  private readonly baseUrl: string =
    process.env.NODE_ENV === "production" ? "https://api.wolfie.app/v1" : "http://192.168.1.50:3000/v1";

  constructor(private readonly language: string) {}

  protected refreshToken = (body: AuthRefreshTokenBody) => async (): Promise<ApiResponse<AuthRefreshTokenResponse>> =>
    this.post<AuthRefreshTokenResponse, AuthRefreshTokenBody>(`/auth/refresh-token`, body).then((response) =>
      responseDto(response),
    );

  protected getHeaders(contentType?: string): Headers {
    const headers = new Headers();
    headers.append("Accept-Language", this.language);
    if (contentType) {
      headers.append("Content-Type", contentType);
    }
    headers.append("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);

    return headers;
  }

  protected interceptors = async (
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

  protected async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, { headers: this.getHeaders() });
    const interceptResponse = await this.interceptors(response, "GET", path);

    return interceptResponse.json();
  }

  protected async post<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  protected async postForm<T, B>(path: string, body: B): Promise<T> {
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

  protected async put<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "POST", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  protected async patch<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      headers: this.getHeaders("application/json"),
      body: JSON.stringify(body),
    });
    const interceptResponse = await this.interceptors(response, "PATCH", path, JSON.stringify(body));

    return interceptResponse.json();
  }

  protected async delete<T = CommonMessageResponseModel>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, { headers: this.getHeaders(), method: "DELETE" });
    const interceptResponse = await this.interceptors(response, "DELETE", path);

    return interceptResponse.json();
  }
}
