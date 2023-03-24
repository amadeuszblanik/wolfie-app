import * as yup from "yup";

export const formSchema = yup
  .object({
    currentPassword: yup
      .string()
      .required("common.form.errors.required")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "common.form.errors.password"),
    newPassword: yup
      .string()
      .required("common.form.errors.required")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "common.form.errors.password"),
    newPasswordConfirm: yup
      .string()
      .required("common.form.errors.required")
      .oneOf([yup.ref("newPassword"), null], "common.form.errors.password_confirm"),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
