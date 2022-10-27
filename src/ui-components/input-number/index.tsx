import React from "react";
import { clamp } from "bme-utils";
import { StyledInput } from "../input/styled";

interface Props {
  placeholder?: string;
  plain?: boolean;
  value: number | undefined;
  min?: number;
  max?: number;
  onChange: (nextValue: number | undefined) => void;
  disabled?: boolean;
  error?: boolean;
  inputMode?: "none" | "tel" | "numeric" | "decimal" | undefined;
}

const Component: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  max,
  min,
  onChange,
  plain,
  disabled,
  inputMode,
  error,
}) => (
  <StyledInput
    placeholder={placeholder}
    type="number"
    inputMode={inputMode}
    value={value}
    onChange={({ target: { value: nextValue } }) =>
      onChange(clamp(Number(nextValue), min || -Infinity, max || Infinity))
    }
    max={max}
    min={min}
    plain={plain}
    disabled={disabled}
    error={error}
  />
);

Component.displayName = "DoggoUI/InputNumber";

export default Component;
