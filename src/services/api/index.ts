import ApiBase from "./base";
import {
  ApiAuthEndpoint,
  ApiBreedEndpoint,
  ApiConfigEndpoint,
  ApiMedicineEndpoint,
  ApiPetsEndpoint,
} from "./endpoint.type";
import { AuthSignInResponse } from "./types/auth/sign-in/response.type";
import { AuthSignInPayload } from "./types/auth/sign-in/payload.type";
import { AuthSignUpPayload } from "./types/auth/sign-up/payload.type";
import { AuthSignUpResponse } from "./types/auth/sign-up/response.type";
import { AuthProfileGetResponse } from "./types/auth/profile/get/response.type";
import { ConfigResponse } from "./types/config/response.type";
import { PetsMyResponse } from "./types/pets/my/response.type";
import { PetsPetIdWeightGetResponse } from "./types/pets/:petId/weight/get/response.type";
import { PetsPetIdHealthLogGetResponse } from "./types/pets/:petId/health-log/get/response.type";
import { AuthProfilePutResponse } from "./types/auth/profile/put/response.type";
import { AuthProfilePutPayload } from "./types/auth/profile/put/payload.type";
import { AuthChangePasswordPayload } from "./types/auth/change-password/payload.type";
import { AuthChangePasswordResponse } from "./types/auth/change-password/response.type";
import { AuthRefreshTokenGetResponse } from "./types/auth/refresh-token/get/response.type";
import { AuthRefreshTokenPostPayload } from "./types/auth/refresh-token/post/payload.type";
import { AuthRefreshTokenPostResponse } from "./types/auth/refresh-token/post/response.type";
import { AuthRefreshTokenDeleteResponse } from "./types/auth/refresh-token/delete/response.type";
import { AuthDeleteAccountPayload } from "./types/auth/delete-account/payload.type";
import { AuthDeleteAccountResponse } from "./types/auth/delete-account/response.type";
import { AuthDeactivateAccountPayload } from "./types/auth/deactivate-account/payload.type";
import { AuthDeactivateAccountResponse } from "./types/auth/deactivate-account/response.type";
import { AuthConfirmEmailResponse } from "./types/auth/confirm-email/response.type";
import { AuthConfirmEmailPayload } from "./types/auth/confirm-email/payload.type";
import { AuthResetPasswordPutPayload } from "./types/auth/reset-password/put/payload.type";
import { AuthResetPasswordPutResponse } from "./types/auth/reset-password/put/response.type";
import { AuthResetPasswordGetPayload } from "./types/auth/reset-password/get/response.type";
import { PetsAddPayload } from "./types/pets/add/payload.type";
import { PetsAddResponse } from "./types/pets/add/response.type";
import { BreedResponse } from "./types/breed/response.type";
import { PetsPetIdPutPayload } from "./types/pets/:petId/put/payload.type";
import { PetsPetIdPutResponse } from "./types/pets/:petId/put/response.type";
import { PetsPetIdWeightPostPayload } from "./types/pets/:petId/weight/post/payload.type";
import { PetsPetIdWeightPostResponse } from "./types/pets/:petId/weight/post/response.type";
import { PetsPetIdWeightPatchResponse } from "./types/pets/:petId/weight/patch/response.type";
import { PetsPetIdWeightPatchPayload } from "./types/pets/:petId/weight/patch/payload.type";
import { PetsPetIdHealthLogPostResponse } from "./types/pets/:petId/health-log/post/response.type";
import { PetsPetIdHealthLogPatchResponse } from "./types/pets/:petId/health-log/patch/response.type";
import { PetsPetIdHealthLogPostPayload } from "./types/pets/:petId/health-log/post/payload.type";
import { PetsPetIdHealthLogPatchPayload } from "./types/pets/:petId/health-log/patch/payload.type";
import { MedicineShortResponse } from "./types/medicine/response.type";
import { ApiMessage } from "./types/api-message.type";
import { apiUrl } from "../../utils";

export default class ApiService extends ApiBase {
  authProfile = {
    get: async () => await this.get<AuthProfileGetResponse>(ApiAuthEndpoint.Profile),
    put: async (payload: AuthProfilePutPayload) =>
      await this.put<AuthProfilePutResponse>(ApiAuthEndpoint.Profile, payload),
  };

  authRefreshToken = {
    get: async () => await this.get<AuthRefreshTokenGetResponse>(ApiAuthEndpoint.RefreshToken),
    post: async (payload: AuthRefreshTokenPostPayload) =>
      await this.post<AuthRefreshTokenPostResponse>(ApiAuthEndpoint.RefreshToken, payload),
    delete: async (refreshTokenId: string) =>
      await this.delete<AuthRefreshTokenDeleteResponse>(apiUrl(ApiAuthEndpoint.RefreshTokenById, { refreshTokenId })),
  };

  authResetPassword = {
    get: async (userEmail: string) =>
      await this.get<AuthResetPasswordGetPayload>(
        apiUrl(ApiAuthEndpoint.ResetPassword, undefined, {
          "user-email": userEmail,
        }),
      ),
    put: async (payload: AuthResetPasswordPutPayload) =>
      await this.put<AuthResetPasswordPutResponse>(ApiAuthEndpoint.ResetPassword, payload),
  };

  petsAdd = {
    post: async (payload: PetsAddPayload) => await this.post<PetsAddResponse>(ApiPetsEndpoint.PetAdd, payload),
  };

  pets = {
    put: async (petId: string, payload: PetsPetIdPutPayload) =>
      await this.put<PetsPetIdPutResponse>(apiUrl(ApiPetsEndpoint.PetsById, { petId }), payload),
    delete: async (petId: string) => await this.delete<ApiMessage>(apiUrl(ApiPetsEndpoint.PetsById, { petId })),
  };

  petsWeight = {
    get: async (petId: string) =>
      await this.get<PetsPetIdWeightGetResponse>(apiUrl(ApiPetsEndpoint.PetsWeight, { petId })),
    post: async (petId: string, payload: PetsPetIdWeightPostPayload) =>
      await this.post<PetsPetIdWeightPostResponse>(apiUrl(ApiPetsEndpoint.PetsWeight, { petId }), payload),
    patch: async (petId: string, weightId: string, payload: PetsPetIdWeightPatchPayload) =>
      await this.patch<PetsPetIdWeightPatchResponse>(
        apiUrl(ApiPetsEndpoint.PetsWeightSingle, { petId, weightId }),
        payload,
      ),
    delete: async (petId: string, weightId: string) =>
      await this.delete<ApiMessage>(apiUrl(ApiPetsEndpoint.PetsWeightSingle, { petId, weightId })),
  };

  petsHealthLog = {
    get: async (petId: string) =>
      await this.get<PetsPetIdHealthLogGetResponse>(apiUrl(ApiPetsEndpoint.PetsHealthLog, { petId })),
    post: async (petId: string, payload: PetsPetIdHealthLogPostPayload) =>
      await this.post<PetsPetIdHealthLogPostResponse>(apiUrl(ApiPetsEndpoint.PetsHealthLog, { petId }), payload),
    patch: async (petId: string, healthLogId: string, payload: PetsPetIdHealthLogPatchPayload) =>
      await this.patch<PetsPetIdHealthLogPatchResponse>(
        apiUrl(ApiPetsEndpoint.PetsHealthLogSingle, { petId, healthLogId }),
        payload,
      ),
    delete: async (petId: string, healthLogId: string) =>
      await this.delete<ApiMessage>(apiUrl(ApiPetsEndpoint.PetsHealthLogSingle, { petId, healthLogId })),
  };

  authSignIn = async (payload: AuthSignInPayload) =>
    await this.post<AuthSignInResponse>(ApiAuthEndpoint.SignIn, payload);

  authSignUp = async (payload: AuthSignUpPayload) =>
    await this.post<AuthSignUpResponse>(ApiAuthEndpoint.SignUp, payload);

  authConfirmEmail = async (payload: AuthConfirmEmailPayload) =>
    await this.post<AuthConfirmEmailResponse>(ApiAuthEndpoint.ConfirmEmail, payload);

  authChangePassword = async (payload: AuthChangePasswordPayload) =>
    await this.put<AuthChangePasswordResponse>(ApiAuthEndpoint.ChangePassword, payload);

  authDeleteAccount = async (payload: AuthDeleteAccountPayload) =>
    await this.delete<AuthDeleteAccountResponse>(ApiAuthEndpoint.DeleteAccount, payload);

  authDeactivateAccount = async (payload: AuthDeactivateAccountPayload) =>
    await this.delete<AuthDeactivateAccountResponse>(ApiAuthEndpoint.DeactivateAccount, payload);

  petsMy = async () => await this.get<PetsMyResponse>(ApiPetsEndpoint.PetsMy);

  config = async () => await this.get<ConfigResponse>(ApiConfigEndpoint.Config);

  breed = async () => await this.get<BreedResponse>(ApiBreedEndpoint.Breed);

  medicine = async () => await this.get<MedicineShortResponse>(ApiMedicineEndpoint.Medicine);
}
