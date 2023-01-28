import React from "react";
import { FormControl } from "./Control/types";
import { ApiStatus } from "../../services/api/types/status.type";

export interface FormValues {
  [key: string]: {
    value: string;
    errors: string[];
    touched: boolean;
  };
}

export interface FormValuesSubmit {
  [key: string]: string | boolean;
}

export interface FormBuilderProps {
  controls: FormControl[];
  onSubmit: (values: FormValuesSubmit) => void;
  apiStatus: ApiStatus;
  apiError: string | null;
  onErrorClose: () => void;
  children?: React.ReactNode;
}
