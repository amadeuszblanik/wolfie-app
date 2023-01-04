export interface AuthSignInPayload {
  username: string;
  password: string;
  keepSignIn: boolean;
  device?: string;
}
