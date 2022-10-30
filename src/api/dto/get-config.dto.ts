import { ConfigResponseModel } from "../response-model/config.response-model";
import { UserRoles } from "../types/user-roles.types";
import { WeightUnits } from "../types/weight-units.types";

const getConfigDto = (data: ConfigResponseModel): ConfigResponseModel => ({
  role: data.role as UserRoles,
  weightUnits: data.weightUnits as WeightUnits,
  userPets: Number(data.userPets),
  userPetsAllowed: Number(data.userPetsAllowed),
  canAddNewPet: Boolean(data.canAddNewPet),
});

export default getConfigDto;
