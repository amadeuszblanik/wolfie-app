import * as yup from "yup";
import { HealthLogKind } from "../../types/health-log-kind.types";

export const formSchema = yup
  .object({
    kind: yup
      .mixed()
      .oneOf(Object.values(HealthLogKind))
      .required("common.form.errors.required")
      .default(HealthLogKind.Treatment),
    date: yup.string().required("common.form.errors.required"),
    medicines: yup.array().of(yup.string().required()).required(),
    additionalMedicines: yup.array().of(yup.string().required()).required(),
    diagnosis: yup.string(),
    nextVisit: yup.date(),
    veterinary: yup.string(),
    description: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
