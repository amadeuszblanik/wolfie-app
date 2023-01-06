import ApiBase from "./base";
import { ApiAuthEndpoint, ApiConfigEndpoint } from "./endpoint.type";
import { AuthSignInResponse } from "./types/auth/sign-in/response.type";
import { AuthSignInPayload } from "./types/auth/sign-in/payload.type";
import { AuthSignUpPayload } from "./types/auth/sign-up/payload.type";
import { AuthSignUpResponse } from "./types/auth/sign-up/response.type";
import { AuthProfileResponse } from "./types/auth/profile/get/response.type";
import { ConfigResponse } from "./types/config/response.type";

export default class ApiService extends ApiBase {
  // Auth
  authProfile = {
    get: async () => await this.get<AuthProfileResponse>(ApiAuthEndpoint.Profile),
  };

  authSignIn = async (payload: AuthSignInPayload) =>
    await this.post<AuthSignInResponse>(ApiAuthEndpoint.SignIn, payload);

  authSignUp = async (payload: AuthSignUpPayload) =>
    await this.post<AuthSignUpResponse>(ApiAuthEndpoint.SignUp, payload);

  //   Config
  config = async () => await this.get<ConfigResponse>(ApiConfigEndpoint.Config);
}
