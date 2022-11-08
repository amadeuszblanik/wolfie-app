import { UserResponseModel } from "./user.response-model";
import { ShortMedicineResponseModel } from "./short-medicine.response-model";
import { HealthLogKindTypes } from "../../types/healt-log-kind.types";

export interface HealthLogResponseModel {
  id: string;
  kind: HealthLogKindTypes;
  date: Date;
  medicines: ShortMedicineResponseModel[];
  additionalMedicines: string[];
  veterinary: string | null;
  diagnosis: string | null;
  nextVisit: Date | null;
  description: string | null;
  addedBy: UserResponseModel;
  createdAt: Date;
  updatedAt: Date;
}
