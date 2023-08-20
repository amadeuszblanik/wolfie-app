import * as yup from "yup";

export const formSchema = yup
  .object({
    name: yup.string().required("common.form.errors.required"),
    address: yup.string(),
    city: yup.string(),
    postCode: yup.string(),
    country: yup.string(),
    phoneNumber: yup.string(),
    email: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
