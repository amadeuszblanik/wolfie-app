import { WeightUnits } from "../../../../../../types/weight-units.type";
import { UserRoles } from "../../../../../../types/user-roles.type";

export interface AuthProfilePutResponse {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  weightUnit: WeightUnits;
  userRole: UserRoles;
  createdAt: string;
  updatedAt: string;
}
