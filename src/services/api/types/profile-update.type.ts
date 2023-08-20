import { WeightUnits } from "../../../types/weight-units.type";

export interface ProfileUpdateApi {
  firstName: string;
  lastName: string;
  birthDate: string;
  weightUnit: WeightUnits;
}
