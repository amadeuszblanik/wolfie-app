import { ConfigPrivateResponseModel } from "../response-model/config-private.response-model";
import { UserRoles } from "../types/user-roles.types";
import { WeightUnits } from "../types/weight-units.types";

const getConfigPrivateDto = (data: ConfigPrivateResponseModel): ConfigPrivateResponseModel => ({
  role: data.role as UserRoles,
  weightUnits: data.weightUnits as WeightUnits,
  userPets: Number(data.userPets),
  userPetsAllowed: Number(data.userPetsAllowed),
  canAddNewPet: Boolean(data.canAddNewPet),
});

export default getConfigPrivateDto;
