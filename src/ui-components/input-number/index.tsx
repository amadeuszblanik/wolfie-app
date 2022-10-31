import React, { useEffect } from "react";
import { clamp } from "bme-utils";
import { StyledInput } from "../input/styled";
import { pipeNumber } from "../../pipe";
import { toNumber } from "../../utils";

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
}) => {
  const [styledValue, setStyledValue] = React.useState<string>(value ? pipeNumber(value) : "");

  useEffect(() => {
    setStyledValue(value ? pipeNumber(value) : "");
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;

    const addDecimalSeparator = nextValue.endsWith(".") || nextValue.endsWith(",");

    const clampedValue = clamp(toNumber(nextValue), min || -Infinity, max || Infinity);
    setStyledValue(!isNaN(clampedValue) ? `${pipeNumber(clampedValue)}${addDecimalSeparator ? "." : ""}` : "");

    onChange(clampedValue);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      type="text"
      inputMode={inputMode}
      value={styledValue}
      onChange={handleChange}
      max={max}
      min={min}
      plain={plain}
      disabled={disabled}
      error={error}
    />
  );
};

Component.displayName = "DoggoUI/InputNumber";

export default Component;
