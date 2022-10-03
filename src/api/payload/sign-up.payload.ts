import { WeightUnits } from "../types/weight-units.types";

export interface SignUpPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  weightUnit: WeightUnits;
  gdprConsent: boolean;
}
