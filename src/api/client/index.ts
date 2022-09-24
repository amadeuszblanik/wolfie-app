import { AuthSignInBody, AuthSignInResponse } from "../types/auth-sign-in.types";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import myPetsDto from "../dto/my-pets.dto";
import { CommonErrorResponseModel } from "../response-model/common-error.response-model";
import responseDto, { ApiResponse } from "../dto/response.dto";

export default class ApiClient {
  private readonly baseUrl: string = "http://localhost:3000/api";

  constructor(private readonly language: string) {}

  public signIn = async (body: AuthSignInBody): Promise<AuthSignInResponse | CommonErrorResponseModel> => {
    return this.post("/auth/sign-in", body);
  };

  public petsMy = async (): Promise<ApiResponse<PetSingleResponseModel[]>> => {
    return this.get<PetSingleResponseModel[]>("/pets/my").then((response) => responseDto(response, myPetsDto));
  };

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append("Accept-Language", this.language);
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);
    return headers;
  }

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, { headers: this.getHeaders() });
    return response.json();
  }

  private async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
