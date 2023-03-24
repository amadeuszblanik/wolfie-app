import * as yup from "yup";

export const formSchema = yup
  .object({
    userEmail: yup.string().required("common.form.errors.required").email("common.form.errors.email"),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
