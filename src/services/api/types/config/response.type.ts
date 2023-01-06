import { UserRoles } from "../../../../types/user-roles.type";
import { WeightUnits } from "../../../../types/weight-units.type";

export interface ConfigResponse {
  role: UserRoles;
  weightUnits: WeightUnits;
  userPets: number;
  userPetsAllowed: number;
  canAddNewPet: boolean;
}
