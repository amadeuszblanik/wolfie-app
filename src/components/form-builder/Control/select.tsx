import React from "react";
import { BmeSelect } from "bme-ui";
import { SelectItem } from "bme-ui/dist/atoms/select/types";
import { FormControlSelectProps } from "./types";

const Component: React.FC<FormControlSelectProps> = ({ name, label, value, onChange, error, options }) => (
  <BmeSelect
    name={name}
    value={options.find(({ key }) => key === value) || null}
    label={label}
    onValue={(nextValue: SelectItem | null) => onChange(nextValue?.key || "")}
    width="100%"
    error={error}
    list={options}
    native
  />
);

export default Component;
