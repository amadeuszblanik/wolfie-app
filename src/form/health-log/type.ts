import * as yup from "yup";
import { HealthLogKind } from "../../types/health-log-kind.types";

export const formSchema = yup
  .object({
    name: yup.string(),
    kind: yup
      .mixed()
      .oneOf(Object.values(HealthLogKind))
      .required("common.form.errors.required")
      .default(HealthLogKind.Treatment),
    date: yup.string().required("common.form.errors.required"),
    time: yup.string(),
    medicines: yup.array().of(yup.string().required()).required(),
    diagnosis: yup.string(),
    nextVisitDate: yup.string(),
    nextVisitTime: yup.string(),
    vet: yup.string(),
    description: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
