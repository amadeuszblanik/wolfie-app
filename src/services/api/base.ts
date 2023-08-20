import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiAuthEndpoint } from "./endpoint.type";
import { cookie } from "../../utils";

const ERROR_STATUS_CODE_BREAKPOINT = 400;
const ERROR_STATUS_REFRESH_TOKEN = 401;
const IS_SERVER = typeof window === "undefined";

// @TODO: Remove local storage and use cookies instead - After release of new mobile app

interface ApiRequestGetOptions {
  headers?: Record<string, string>;
  accessToken?: string;
}

export default class ApiBase {
  protected readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "https://api.wolfie.app/v2";
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { retry?: boolean };

        if (error.response.status === ERROR_STATUS_REFRESH_TOKEN && !originalRequest.retry) {
          originalRequest.retry = true;
          const accessToken = await this.refreshSession();

          if (accessToken) {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            } else {
              originalRequest.headers = this.getHeaders({ Authorization: `Bearer ${accessToken}` });
            }

            return this.axiosInstance.request(originalRequest);
          }
        }

        return Promise.reject(error.response.data);
      },
    );
  }

  protected async get<T>(path: string, options?: ApiRequestGetOptions): Promise<T> {
    const response = await this.request({
      method: "GET",
      url: path,
      headers: this.getHeaders(options?.headers),
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  protected async post<T>(path: string, body?: any): Promise<T> {
    const response = await this.request({
      method: "POST",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  protected async postMultipart<T>(path: string, body: any): Promise<T> {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      }

      if (value instanceof Array) {
        value.forEach((file) => {
          formData.append(key, file, file.name);
        });
      }

      if (typeof value === "string") {
        formData.append(key, value);
      }

      if (typeof value === "number") {
        formData.append(key, value.toString());
      }

      if (typeof value === "boolean") {
        formData.append(key, value.toString());
      }

      if (value === null) {
        formData.append(key, "");
      }
    });

    const response = await this.request({
      method: "POST",
      url: path,
      headers: this.getHeaders({}, null),
      data: formData,
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  protected async put<T>(path: string, body: any): Promise<T> {
    const response = await this.request({
      method: "PUT",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  protected async patch<T>(path: string, body: any): Promise<T> {
    const response = await this.request({
      method: "PATCH",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  protected async delete<T>(path: string, body?: any): Promise<T> {
    const response = await this.request({
      method: "DELETE",
      url: path,
      headers: this.getHeaders(),
      data: body ? JSON.stringify(body) : undefined,
    });

    const data = response.data;

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(data.message);
    }

    return data;
  }

  private getHeaders(init?: Record<string, string>, contentType: string | null = "application/json"): AxiosHeaders {
    const headers = new AxiosHeaders(init);

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    const accessToken = IS_SERVER ? null : cookie.get("accessToken") || localStorage.getItem("accessToken");

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.request(config);
  }

  private async refreshSession(): Promise<string | null> {
    try {
      const response = await axios.post(`${this.baseUrl}${ApiAuthEndpoint.RefreshToken}`, {
        refreshToken: cookie.get("refreshToken"),
      });
      const { accessToken, refreshToken } = response.data;

      cookie.set("accessToken", accessToken, { path: "/", expires: new Date("2100") });
      cookie.set("refreshToken", refreshToken, { path: "/", expires: new Date("2100") });

      return accessToken;
    } catch (error) {
      if (!IS_SERVER && location.href.startsWith("/app")) {
        location.href = "/auth/sign-off";
      }

      return null;
    }
  }
}
