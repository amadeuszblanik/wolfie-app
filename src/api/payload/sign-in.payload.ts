export interface SignInPayload {
  username: string;
  password: string;
  keepSignIn?: boolean;
  device?: string;
}
