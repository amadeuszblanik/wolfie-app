import React from "react";
import { StyledInput } from "../input/styled";

interface Props {
  placeholder?: string;
  plain?: boolean;
  value: string | undefined;
  min?: string;
  max?: string;
  onChange: (nextValue: string | undefined) => void;
  disabled?: boolean;
  error?: boolean;
}

const Component: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  max,
  min,
  onChange,
  plain,
  disabled,
  error,
}) => (
  <StyledInput
    placeholder={placeholder}
    type="date"
    value={value}
    onChange={({ target: { value: nextValue } }) => onChange(nextValue)}
    max={max}
    min={min}
    plain={plain}
    disabled={disabled}
    error={error}
  />
);

Component.displayName = "DoggoUI/InputDate";

export default Component;
