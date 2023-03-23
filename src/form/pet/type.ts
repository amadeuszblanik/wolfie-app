import * as yup from "yup";

export const formSchema = yup
  .object({
    name: yup.string().required("common.form.errors.required"),
    breed: yup.number(),
    microchip: yup.string(),
    birthDate: yup.date().required("common.form.errors.required"),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
