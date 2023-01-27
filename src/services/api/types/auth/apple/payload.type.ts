export interface AuthApplePayload {
  state?: string;
  idToken: string;
  code: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  device?: string;
}
