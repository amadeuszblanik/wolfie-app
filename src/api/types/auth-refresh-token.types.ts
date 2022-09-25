export interface AuthRefreshTokenBody {
  refreshToken: string;
}

export interface AuthRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
