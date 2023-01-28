import React from "react";
import { BmeCheckbox } from "bme-ui";
import { FormControlCheckboxProps } from "./types";

const Component: React.FC<FormControlCheckboxProps> = ({ name, label, value, onChange, error }) => (
  <BmeCheckbox
    name={name}
    value={!!value}
    label={label}
    onValue={(next) => onChange(next ? "true" : "")}
    error={error}
  />
);

export default Component;
