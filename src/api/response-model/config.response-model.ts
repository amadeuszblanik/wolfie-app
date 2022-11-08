import { UserRoles } from "../types/user-roles.types";
import { WeightUnits } from "../types/weight-units.types";

export interface ConfigResponseModel {
  role: UserRoles;
  weightUnits: WeightUnits;
  userPets: number;
  userPetsAllowed: number;
  canAddNewPet: boolean;
}
