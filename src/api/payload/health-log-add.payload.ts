import { HealthLogKindTypes } from "../../types/healt-log-kind.types";

export interface HealthLogAddPayload {
  kind: HealthLogKindTypes;
  date: string;
  medicines?: string[] | null;
  additionalMedicines?: string | null;
  diagnosis?: string | null;
  nextVisit?: Date | null;
  veterinary?: string | null;
  description?: string | null;
}
