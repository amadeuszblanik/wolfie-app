import { ProfileResponseModel } from "../response-model/profile.response-model";
import { WeightUnits } from "../types/weight-units.types";
import { UserRoles } from "../types/user-roles.types";

const profileDto = (data: ProfileResponseModel): ProfileResponseModel => ({
  id: data.id,
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  password: data.password,
  isActive: data.isActive,
  isEmailVerified: data.isEmailVerified,
  weightUnit: data.weightUnit as WeightUnits,
  userRole: data.userRole as UserRoles,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export default profileDto;
