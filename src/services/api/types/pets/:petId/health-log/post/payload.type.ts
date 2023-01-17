import { HealthLogKind } from "../../../../../../../types/health-log-kind.types";

export interface PetsPetIdHealthLogPostPayload {
  kind: HealthLogKind;
  date: string;
  medicines: string[];
  additionalMedicines: string;
  diagnosis: string;
  nextVisit: Date;
  veterinary: string;
  description: string;
}
