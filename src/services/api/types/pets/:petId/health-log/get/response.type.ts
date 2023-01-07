import { HealthLogKind } from "../../../../../../../types/health-log-kind.types";
import { MedicineShortSingleResponse } from "../../../../medicine/response.type";
import { UserInfo } from "../../../../../../../types/user-info.type";

export interface PetsPetIdHealthLogSingleGetResponse {
  id: string;
  kind: HealthLogKind;
  date: string;
  medicines: MedicineShortSingleResponse[];
  additionalMedicines: string[];
  veterinary: string | null;
  diagnosis: string | null;
  nextVisit: string | null;
  description: string | null;
  addedBy: UserInfo;
  createdAt: string;
  updatedAt: string;
}

export type PetsPetIdHealthLogGetResponse = PetsPetIdHealthLogSingleGetResponse[];
