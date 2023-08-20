import { VetApi } from "./vet.type";
import { HealthLogKind } from "../../../types/health-log-kind.types";

interface Medicine {
  productNumber: string | null;
  name: string;
}

interface UserSimplified {
  firstName: string;
  lastName: string;
}

export interface HealthLogApi {
  id: string;
  name: string | null;
  dateTime: string;
  date: string;
  time: string;
  kind: HealthLogKind;
  medicines: Medicine[];
  diagnosis: string | null;
  nextVisitDateTime: string | null;
  nextVisitDate: string | null;
  nextVisitTime: string | null;
  vet: VetApi | null;
  description: string | null;
  user: UserSimplified;
}
