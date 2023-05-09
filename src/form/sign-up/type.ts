import * as yup from "yup";
import { WeightUnits } from "../../types/weight-units.type";

export const formSchema = yup
  .object({
    email: yup.string().required("common.form.errors.required").email("common.form.errors.email"),
    firstName: yup.string().required("common.form.errors.required"),
    lastName: yup.string().required("common.form.errors.required"),
    password: yup
      .string()
      .required("common.form.errors.required")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "common.form.errors.password"),
    birthDate: yup
      .string()
      .required("common.form.errors.required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "common.form.errors.date"),
    weightUnit: yup
      .mixed()
      .oneOf(Object.values(WeightUnits))
      .required("common.form.errors.required")
      .default(WeightUnits.Kilogram),
    acceptedGdpr: yup.bool().oneOf([true], "common.form.errors.gdpr_consent"),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
