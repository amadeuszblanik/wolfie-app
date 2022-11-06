import { WeightUnits } from "../types/weight-units.types";

export interface UserResponseModel {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  weightUnit: WeightUnits;
  // petUsers: PetUsers[]; @@TODO - verify this on backend
  userRole: string;
  // userAuthToken: RefreshToken; @@TODO - verify this on backend
  createdAt: Date;
  updatedAt: Date;
}
