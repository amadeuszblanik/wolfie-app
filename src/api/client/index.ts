import { AuthSignInBody, AuthSignInResponse } from "../types/auth-sign-in.types";

interface CommonErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export default class ApiClient {
  constructor(private readonly baseUrl: string = "http://localhost:3000/api") {}

  public signIn = async (body: AuthSignInBody): Promise<AuthSignInResponse | CommonErrorResponse> => {
    return this.post("/auth/sign-in", body);
  };

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);
    return response.json();
  }

  private async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
