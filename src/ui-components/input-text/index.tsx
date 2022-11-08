import React from "react";
import { StyledInput } from "../input/styled";
import { DEFAULT_VARCHAR_LENGTH } from "../../settings/globals";
import Box, { BoxWidth, FlexAlign } from "../box";
import Text, { DoggoTextVariant } from "../text";

interface Props {
  placeholder?: string;
  plain?: boolean;
  value: string;
  onChange: (nextValue: string) => void;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
}

const Component: React.FunctionComponent<Props> = ({
  placeholder,
  value,
  onChange,
  maxLength,
  plain,
  disabled,
  inputMode,
  error,
}) => (
  <Box width={BoxWidth.Full} column>
    <StyledInput
      placeholder={placeholder}
      type="text"
      inputMode={inputMode}
      value={value}
      onChange={({ target: { value: nextValue } }) => onChange(nextValue)}
      maxLength={maxLength}
      plain={plain}
      disabled={disabled}
      error={error}
    />
    <Box width={BoxWidth.Full} alignX={FlexAlign.Right}>
      <Text variant={DoggoTextVariant.Caption2}>
        {value.length}/{maxLength}
      </Text>
    </Box>
  </Box>
);

Component.displayName = "DoggoUI/InputText";

Component.defaultProps = {
  maxLength: DEFAULT_VARCHAR_LENGTH,
};

export default Component;
