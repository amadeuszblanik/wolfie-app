export interface AuthSignInBody {
  username: string;
  password: string;
  keepSignIn?: boolean;
  device?: string;
}

export interface AuthSignInResponse {
  accessToken: string;
  refreshToken: string;
}
