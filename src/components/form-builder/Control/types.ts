import { SelectItem } from "bme-ui/dist/atoms/select/types";

export type FormValidators = "required" | "requiredTrue" | "email" | "password";

interface FormControlGeneric {
  name: string;
  validators?: FormValidators[];
  initialValue?: string;
  error?: string;
  label: string;
}

interface FormGenericProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FormControlText extends FormControlGeneric {
  type: "text" | "password" | "email" | "search";
}

export interface FormControlCheckbox extends FormControlGeneric {
  type: "checkbox";
}

export interface FormControlSelect extends FormControlGeneric {
  type: "select";
  options: SelectItem[];
}

export type FormControlCheckboxProps = FormControlCheckbox & FormGenericProps;

export type FormControlSelectProps = FormGenericProps & FormControlSelect;

export type FormControlTextProps = FormControlText & FormGenericProps;

export type FormControl = FormControlText | FormControlCheckbox | FormControlSelect;

export type FormControlProps = FormControlTextProps | FormControlCheckboxProps | FormControlSelectProps;
