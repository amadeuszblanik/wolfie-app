import React from "react";
import { BmeInput } from "bme-ui";
import { FormControlTextProps } from "./types";

const Component: React.FC<FormControlTextProps> = ({ type, name, label, value, onChange, error }) => (
  <BmeInput name={name} value={value} label={label} onValue={onChange} type={type} width="100%" error={error} />
);

export default Component;
