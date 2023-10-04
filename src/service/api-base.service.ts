import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import ApiError from "@/model/api-error.model";

const ERROR_STATUS_CODE_BREAKPOINT = 400;

interface ApiRequestGetOptions {
  headers?: Record<string, string>;
  accessToken?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
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
      validateStatus: () => true,
    });
  }

  protected async get<T>(path: string, options?: ApiRequestGetOptions): Promise<ApiResponse<T>> {
    const response = await this.request({
      method: "GET",
      url: path,
      headers: this.getHeaders(options?.headers),
    });

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      return {
        success: false,
        error: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  protected async post<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const response = await this.request({
      method: "POST",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      return {
        success: false,
        error: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  protected async put<T>(path: string, body: any): Promise<ApiResponse<T>> {
    const response = await this.request({
      method: "PUT",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      return {
        success: false,
        error: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  protected async patch<T>(path: string, body: any): Promise<ApiResponse<T>> {
    const response = await this.request({
      method: "PATCH",
      url: path,
      headers: this.getHeaders(),
      data: JSON.stringify(body),
    });

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      return {
        success: false,
        error: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  protected async delete<T>(path: string, body?: any): Promise<ApiResponse<T>> {
    const response = await this.request({
      method: "DELETE",
      url: path,
      headers: this.getHeaders(),
      data: body ? JSON.stringify(body) : undefined,
    });

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      return {
        success: false,
        error: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  }

  private getHeaders(init?: Record<string, string>, contentType: string | null = "application/json"): AxiosHeaders {
    const headers = new AxiosHeaders(init);

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    return headers;
  }

  private request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.request(config);
  }
}
