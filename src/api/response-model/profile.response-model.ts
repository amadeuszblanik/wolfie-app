import { WeightUnits } from "../types/weight-units.types";
import { UserRoles } from "../types/user-roles.types";

export interface ProfileResponseModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  isEmailVerified: boolean;
  weightUnit: WeightUnits;
  userRole: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
