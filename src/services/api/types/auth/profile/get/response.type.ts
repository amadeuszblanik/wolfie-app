import { WeightUnits } from "../../../../../../types/weight-units.type";
import { UserRoles } from "../../../../../../types/user-roles.type";

export interface AuthProfileGetResponse {
  birthDate: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  weightUnit: WeightUnits;
}
