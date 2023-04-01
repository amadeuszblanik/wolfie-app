import * as yup from "yup";

export const formSchema = yup
  .object({
    username: yup.string().required("common.form.errors.required"),
    password: yup.string().required("common.form.errors.required"),
    keepSignIn: yup.boolean().default(false),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
