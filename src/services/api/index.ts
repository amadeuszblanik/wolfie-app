import ApiBase from "./base";
import {
  ApiAuthEndpoint,
  ApiBreedEndpoint,
  ApiCalendarEndpoint,
  ApiConfigEndpoint,
  ApiMedicineEndpoint,
  ApiPetsEndpoint,
  ApiVetEndpoint,
} from "./endpoint.type";
import { AuthSignInResponse } from "./types/auth/sign-in/response.type";
import { AuthSignInPayload } from "./types/auth/sign-in/payload.type";
import { AuthSignUpPayload } from "./types/auth/sign-up/payload.type";
import { AuthSignUpResponse } from "./types/auth/sign-up/response.type";
import { ConfigResponse } from "./types/config/response.type";
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
import { MedicineShortResponse } from "./types/medicine/response.type";
import { GenericMessageApi } from "./types/generic-message.type";
import { AuthApplePayload } from "./types/auth/apple/payload.type";
import { AuthAppleResponse } from "./types/auth/apple/response.type";
import { AuthTestNotificationResponse } from "./types/auth/test-notification/response.type";
import { PetApi } from "./types/pet.type";
import { ResultsListApi } from "./types/results-list.type";
import { PetCreatePayloadApi } from "./types/pet-create-payload.type";
import { WeightApi } from "./types/weight.type";
import { WeightCreatePayloadApi } from "./types/weight-create-payload.type";
import { AuthLimitApi } from "./types/auth-limit.type";
import { CalendarDao } from "./types/calendar.type";
import { HealthLogApi } from "./types/health-log.type";
import { HealthLogCreateApi } from "./types/health-log-create.type";
import { BreedApi } from "./types/breed.type";
import { UserApi } from "./user.type";
import { ProfileUpdateApi } from "./types/profile-update.type";
import { VetApi } from "./types/vet.type";
import { VetCreateApi } from "./types/vet-create.type";
import { apiUrl } from "../../utils";

export default class ApiService extends ApiBase {
  authProfile = {
    get: async () => await this.get<UserApi>(apiUrl(ApiAuthEndpoint.Profile)),
    patch: async (payload: ProfileUpdateApi) =>
      await this.patch<GenericMessageApi>(apiUrl(ApiAuthEndpoint.Profile), payload),
  };

  authLimit = {
    get: async () => await this.get<AuthLimitApi>(apiUrl(ApiAuthEndpoint.Limit)),
  };

  authRefreshToken = {
    get: async () => await this.get<AuthRefreshTokenGetResponse>(apiUrl(ApiAuthEndpoint.RefreshToken)),
    post: async (payload: AuthRefreshTokenPostPayload) =>
      await this.post<AuthRefreshTokenPostResponse>(apiUrl(ApiAuthEndpoint.RefreshToken), payload),
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
      await this.put<AuthResetPasswordPutResponse>(apiUrl(ApiAuthEndpoint.ResetPassword), payload),
  };

  pets = {
    get: async () => await this.get<ResultsListApi<PetApi>>(apiUrl(ApiPetsEndpoint.Pets)),
    post: async (payload: PetCreatePayloadApi) =>
      await this.post<GenericMessageApi>(apiUrl(ApiPetsEndpoint.Pets), payload),
    patch: async (petId: string, payload: PetCreatePayloadApi) =>
      await this.patch<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsById, { petId }), payload),
    delete: async (petId: string) => await this.delete<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsById, { petId })),
    avatarPost: async (petId: string, payload: any) =>
      await this.postMultipart<any>(apiUrl(ApiPetsEndpoint.PetsAvatar, { petId }), payload),
  };

  petsWeight = {
    get: async (petId: string) =>
      await this.get<ResultsListApi<WeightApi>>(apiUrl(ApiPetsEndpoint.PetsWeight, { petId })),
    post: async (petId: string, payload: WeightCreatePayloadApi) =>
      await this.post<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsWeight, { petId }), payload),
    patch: async (petId: string, weightId: string, payload: WeightCreatePayloadApi) =>
      await this.patch<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsWeightSingle, { petId, weightId }), payload),
    delete: async (petId: string, weightId: string) =>
      await this.delete<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsWeightSingle, { petId, weightId })),
  };

  petsHealthLog = {
    get: async (petId: string) =>
      await this.get<ResultsListApi<HealthLogApi>>(apiUrl(ApiPetsEndpoint.PetsHealthLog, { petId })),
    post: async (petId: string, payload: HealthLogCreateApi) =>
      await this.post<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsHealthLog, { petId }), payload),
    patch: async (petId: string, healthLogId: string, payload: HealthLogCreateApi) =>
      await this.patch<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsHealthLogSingle, { petId, healthLogId }), payload),
    delete: async (petId: string, healthLogId: string) =>
      await this.delete<GenericMessageApi>(apiUrl(ApiPetsEndpoint.PetsHealthLogSingle, { petId, healthLogId })),
  };

  vet = {
    get: async () => await this.get<ResultsListApi<VetApi>>(apiUrl(ApiVetEndpoint.Vet)),
    post: async (payload: VetCreateApi) => await this.post<GenericMessageApi>(apiUrl(ApiVetEndpoint.Vet), payload),
    patch: async (vetId: string, payload: VetCreateApi) =>
      await this.patch<GenericMessageApi>(apiUrl(ApiVetEndpoint.Single, { vetId }), payload),
    delete: async (vetId: string) => await this.delete<GenericMessageApi>(apiUrl(ApiVetEndpoint.Single, { vetId })),
  };

  authSignIn = async (payload: AuthSignInPayload) =>
    await this.post<AuthSignInResponse>(apiUrl(ApiAuthEndpoint.SignIn), payload);

  authApple = async (payload: AuthApplePayload) =>
    await this.post<AuthAppleResponse>(apiUrl(ApiAuthEndpoint.Apple), payload);

  authSignUp = async (payload: AuthSignUpPayload) =>
    await this.post<AuthSignUpResponse>(apiUrl(ApiAuthEndpoint.SignUp), payload);

  authTestNotification = async () =>
    await this.post<AuthTestNotificationResponse>(apiUrl(ApiAuthEndpoint.TestNotification));

  authConfirmEmail = async (payload: AuthConfirmEmailPayload) =>
    await this.post<AuthConfirmEmailResponse>(apiUrl(ApiAuthEndpoint.ConfirmEmail), payload);

  authChangePassword = async (payload: AuthChangePasswordPayload) =>
    await this.put<AuthChangePasswordResponse>(apiUrl(ApiAuthEndpoint.ChangePassword), payload);

  authDeleteAccount = async (payload: AuthDeleteAccountPayload) =>
    await this.delete<AuthDeleteAccountResponse>(apiUrl(ApiAuthEndpoint.DeleteAccount), payload);

  authDeactivateAccount = async (payload: AuthDeactivateAccountPayload) =>
    await this.delete<AuthDeactivateAccountResponse>(apiUrl(ApiAuthEndpoint.DeactivateAccount), payload);

  config = async () => await this.get<ConfigResponse>(apiUrl(ApiConfigEndpoint.Config));

  breed = async () => await this.get<BreedApi[]>(apiUrl(ApiBreedEndpoint.Breed));

  medicine = async () => await this.get<MedicineShortResponse>(apiUrl(ApiMedicineEndpoint.Medicine));

  calendar = async () => await this.get<ResultsListApi<CalendarDao>>(apiUrl(ApiCalendarEndpoint.Calendar));

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor() {
    super();
  }
}
