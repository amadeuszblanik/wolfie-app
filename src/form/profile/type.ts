import * as yup from "yup";
import { WeightUnits } from "../../types/weight-units.type";

export const formSchema = yup
  .object({
    firstName: yup.string().required("common.form.errors.required"),
    lastName: yup.string().required("common.form.errors.required"),
    weightUnit: yup
      .mixed()
      .oneOf(Object.values(WeightUnits))
      .required("common.form.errors.required")
      .default(WeightUnits.Kilogram),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
