import ApiBase from "./base";
import { ApiAuthEndpoint } from "./endpoint.type";
import { AuthSignInResponse } from "./types/auth/sign-in/response.type";

export default class ApiService extends ApiBase {
  constructor() {
    super();
  }

  authSignIn = async (username: string, password: string, keepSignIn: boolean, device?: string) =>
    await this.post<AuthSignInResponse>(ApiAuthEndpoint.SignIn, { username, password, keepSignIn, device });
}
