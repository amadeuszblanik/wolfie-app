import React from "react";
import { StyledInput } from "../input/styled";
import { toDateTime } from "../../utils";

interface Props {
  placeholder?: string;
  plain?: boolean;
  value: Date | undefined;
  min?: Date;
  max?: Date;
  onChange: (nextValue: Date | undefined) => void;
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
    type="datetime-local"
    value={value ? toDateTime(value) : undefined}
    onChange={({ target: { value: nextValue } }) => onChange(nextValue ? new Date(nextValue) : undefined)}
    max={max ? toDateTime(max) : undefined}
    min={min ? toDateTime(min) : undefined}
    plain={plain}
    disabled={disabled}
    error={error}
  />
);

Component.displayName = "DoggoUI/InputDate";

export default Component;
