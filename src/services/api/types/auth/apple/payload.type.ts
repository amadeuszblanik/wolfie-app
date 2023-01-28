import { SignInWithAppleRedirect } from "../../../../../types/sign-in-with-apple-redirect.type";

export interface AuthApplePayload {
  state?: string;
  idToken: string;
  code: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  device?: string;
  service: true;
  redirect: SignInWithAppleRedirect;
}
