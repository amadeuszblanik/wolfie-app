const ERROR_STATUS_CODE_BREAKPOINT = 400;

export default class ApiBase {
  protected readonly url: string = process.env.NEXT_PUBLIC_API_URL || "https://api.wolfie.app/v1";

  protected async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.url}${path}`);
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.status >= ERROR_STATUS_CODE_BREAKPOINT) {
      throw new Error(json.message);
    }

    return json;
  }
}
