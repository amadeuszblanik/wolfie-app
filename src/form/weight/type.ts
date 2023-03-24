import * as yup from "yup";
import { toInputDate, toInputTime } from "../../utils";

export const formSchema = yup
  .object({
    weight: yup.number().required("common.form.errors.required"),
    date: yup.string().required("common.form.errors.required").default(toInputDate()),
    time: yup.string().required("common.form.errors.required").default(toInputTime()),
  })
  .required();

export type FormData = yup.InferType<typeof formSchema>;
