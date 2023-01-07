export interface AuthRefreshTokenSingleGetResponse {
  id: string;
  device: string;
  expiration: string;
}

export type AuthRefreshTokenGetResponse = AuthRefreshTokenSingleGetResponse[];
