import * as yup from "yup";

export const formSignInSchema = yup
  .object({
    username: yup.string().required("common.form.errors.required"),
    password: yup.string().required("common.form.errors.required"),
  })
  .required();

export type FormSignInData = yup.InferType<typeof formSignInSchema>;
