import { WeightUnits } from "../types/weight-units.types";

export interface ProfilePayload {
  firstName?: string;
  lastName?: string;
  weightUnit?: WeightUnits;
}
