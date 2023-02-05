import * as yup from "yup";

export const formSignInSchema = yup
  .object({
    username: yup.string().required("common.form.errors.required"),
    password: yup.string().required("common.form.errors.required"),
    keepSignIn: yup.boolean().default(false),
  })
  .required();

export type FormSignInData = yup.InferType<typeof formSignInSchema>;
