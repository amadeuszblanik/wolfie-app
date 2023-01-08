export enum ApiAuthEndpoint {
  SignUp = "/auth/sign-up",
  SignIn = "/auth/sign-in",
  Apple = "/auth/apple",
  RefreshToken = "/auth/refresh-token",
  RefreshTokenById = "/auth/refresh-token/:refreshTokenId",
  FcmToken = "/auth/fcm-token",
  TestNotification = "/auth/test-notification",
  Profile = "/auth/profile",
  DeactivateAccount = "/auth/deactivate-account",
  DeleteAccount = "/auth/delete-account",
  ChangePassword = "/auth/change-password",
  ResetPassword = "/auth/reset-password",
  ConfirmEmail = "/auth/confirm-email",
}

export enum ApiConfigEndpoint {
  Config = "/config",
}

export enum ApiPetsEndpoint {
  PetsMy = "/pets/my",
  Pet = "/pets/:petId",
  PetAdd = "/pets/add",
  PetsAvatar = "/pets/:petId/avatar",
  PetsWeight = "/pets/:petId/weight",
  PetsWeightSingle = "/pets/:petId/weight/:weightId",

  PetsHealthLog = "/pets/:petId/health-log",
  PetsHealthLogSingle = "/pets/:petId/health-log/:weightId",
}

export enum ApiBreedEndpoint {
  Breed = "/breed",
}
