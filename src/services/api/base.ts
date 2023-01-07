import { cookie } from "../../utils";

const ERROR_STATUS_CODE_BREAKPOINT = 400;
const IS_SERVER = typeof window === "undefined";

interface ApiRequestGetOptions {
  headers?: Record<string, string>;
  accessToken?: string;
}

export default class ApiBase {
  protected readonly url: string = process.env.NEXT_PUBLIC_API_URL || "https://api.wolfie.app/v1";

  protected async get<T>(path: string, options?: ApiRequestGetOptions): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "GET",
      headers: this.getHeaders(options?.headers),
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async put<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async patch<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async delete<T>(path: string, body?: any): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "DELETE",
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  private getHeaders(init?: Record<string, string>): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(init || {}),
    };

    const accessToken = IS_SERVER ? null : cookie.get("accessToken") || localStorage.getItem("accessToken");

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }
}
