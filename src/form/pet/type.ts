import * as yup from "yup";

export const formSchema = yup
  .object({
    name: yup.string().required("common.form.errors.required"),
    breed: yup.number(),
    pureBreed: yup.boolean(),
    birthDate: yup
      .string()
      .required("common.form.errors.required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "common.form.errors.date"),
    microchip: yup.string(),
    neutered: yup.boolean(),
    instagram: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
