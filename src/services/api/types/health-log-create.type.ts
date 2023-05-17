/* eslint-disable no-magic-numbers */

import { HealthLogKind } from "../../../types/health-log-kind.types";

export interface HealthLogCreateApi {
  name?: string;
  date: string;
  time?: string;
  kind: HealthLogKind;
  medicines?: string[];
  diagnosis?: string;
  nextVisitDate?: string;
  nextVisitTime?: string;
  vet?: string;
  description?: string;
}
