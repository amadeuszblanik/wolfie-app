import { cookie } from "../../utils";

const ERROR_STATUS_CODE_BREAKPOINT = 400;
const ERROR_STATUS_REFRESH_TOKEN = 401;
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

    if (ERROR_STATUS_REFRESH_TOKEN === response.status) {
      // @TODO: Refactor it later
      if (!IS_SERVER) {
        location.href = "/auth/refresh-session";
      }
    }

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

    const response = await fetch(`${this.url}${path}`, {
      method: "POST",
      headers: this.getHeaders({}, null),
      body: formData,
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

  private getHeaders(init?: Record<string, string>, contentType: string | null = "application/json"): HeadersInit {
    const headers: HeadersInit = {
      ...(init || {}),
    };

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    const accessToken = IS_SERVER ? null : cookie.get("accessToken") || localStorage.getItem("accessToken");

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }
}
