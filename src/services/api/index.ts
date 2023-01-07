import ApiBase from "./base";
import { ApiAuthEndpoint, ApiConfigEndpoint, ApiPetsEndpoint } from "./endpoint.type";
import { AuthSignInResponse } from "./types/auth/sign-in/response.type";
import { AuthSignInPayload } from "./types/auth/sign-in/payload.type";
import { AuthSignUpPayload } from "./types/auth/sign-up/payload.type";
import { AuthSignUpResponse } from "./types/auth/sign-up/response.type";
import { AuthProfileResponse } from "./types/auth/profile/get/response.type";
import { ConfigResponse } from "./types/config/response.type";
import { PetsMyResponse } from "./types/pets/my/response.type";
import { PetsPetIdWeightGetResponse } from "./types/pets/:petId/weight/get/response.type";
import { PetsPetIdHealthLogGetResponse } from "./types/pets/:petId/health-log/get/response.type";
import { apiUrl } from "../../utils";

export default class ApiService extends ApiBase {
  authProfile = {
    get: async () => await this.get<AuthProfileResponse>(ApiAuthEndpoint.Profile),
  };

  petsWeight = {
    get: async (petId: string) =>
      await this.get<PetsPetIdWeightGetResponse>(apiUrl(ApiPetsEndpoint.PetsWeight, { petId })),
  };

  petsHealthLog = {
    get: async (petId: string) =>
      await this.get<PetsPetIdHealthLogGetResponse>(apiUrl(ApiPetsEndpoint.PetsHealthLog, { petId })),
  };

  authSignIn = async (payload: AuthSignInPayload) =>
    await this.post<AuthSignInResponse>(ApiAuthEndpoint.SignIn, payload);

  authSignUp = async (payload: AuthSignUpPayload) =>
    await this.post<AuthSignUpResponse>(ApiAuthEndpoint.SignUp, payload);

  petsMy = async () => await this.get<PetsMyResponse>(ApiPetsEndpoint.PetsMy);

  config = async () => await this.get<ConfigResponse>(ApiConfigEndpoint.Config);
}
