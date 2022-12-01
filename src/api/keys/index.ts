enum QueryKeysCategories {
  Auth = "AUTH",
  Breeds = "BREEDS",
  Gdpr = "GDPR",
  Medicines = "MEDICINES",
  Pet = "PET",
}

enum QueryKeysAuth {
  AuthorizedDevices = "AUTH/AUTHORIZED DEVICES",
  Config = "CONFIG",
  Profile = "AUTH/PROFILE",
  ResetPassword = "AUTH/RESET PASSWORD",
}

enum QueryKeysPet {
  HealthLog = "PET/HEALTH LOG",
  HealthLogSingle = "PET/HEALTH LOG SINGLE",
  List = "PET/LIST",
  Weight = "PET/WEIGHT",
  WeightSingle = "PET/WEIGHT SINGLE",
  Single = "PET/SINGLE",
}

export const QueryKeys = {
  Auth: {
    all: () => [QueryKeysCategories.Auth],
    authorizedDevices: () => [QueryKeysCategories.Auth, QueryKeysAuth.AuthorizedDevices],
    config: () => [QueryKeysCategories.Auth, QueryKeysAuth.Config],
    profile: () => [QueryKeysCategories.Auth, QueryKeysAuth.Profile],
    resetPassword: () => [QueryKeysCategories.Auth, QueryKeysAuth.ResetPassword],
  },
  Breeds: {
    all: () => [QueryKeysCategories.Breeds],
  },
  Gdpr: {
    all: () => [QueryKeysCategories.Gdpr],
  },
  Medicines: {
    all: () => [QueryKeysCategories.Medicines],
  },
  Pet: {
    all: () => [QueryKeysCategories.Pet],
    healthLog: (petId: string) => [...QueryKeys.Pet.all(), QueryKeysPet.HealthLog, petId],
    healthLogSingle: (petId: string, healthLogId: string) => [
      ...QueryKeys.Pet.all(),
      QueryKeysPet.HealthLogSingle,
      petId,
      healthLogId,
    ],
    list: () => [...QueryKeys.Pet.all(), QueryKeysPet.List],
    weight: (petId: string) => [...QueryKeys.Pet.all(), QueryKeysPet.Weight, petId],
    weightSingle: (petId: string, weightId: string) => [
      ...QueryKeys.Pet.all(),
      QueryKeysPet.WeightSingle,
      petId,
      weightId,
    ],
    single: (petId: string) => [...QueryKeys.Pet.all(), QueryKeysPet.Single, petId],
  },
};
