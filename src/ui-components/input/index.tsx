import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { paddingMixin } from "../mixins";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Box, { BoxWidth } from "../box";
import { DoggoText } from "../index";
import { DoggoTextVariant } from "../text";

export enum InputTypes {
  Color = "color",
  Date = "date",
  DatetimeLocal = "datetime-local",
  Email = "email",
  Month = "month",
  Number = "number",
  Password = "password",
  Search = "search",
  Telephone = "tel",
  Text = "text",
  Time = "time",
  Url = "url",
  Week = "week",
}

interface StyledInputProps {
  plain?: boolean;
}

interface Props {
  label?: string;
  placeholder?: string;
  errors?: string[];
  plain?: boolean;
  value: string;
  onChange: (nextValue: string) => void;
  max?: string;
  min?: string;
  type?: InputTypes | HTMLInputTypeAttribute;
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  text-align: ${({ plain }) => (plain ? "right" : "left")};
  background: var(--color-background);
  border: ${({ plain, theme }) => (!plain ? `2px solid ${theme.palette.gray}` : "none")};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

const Component: React.FunctionComponent<Props> = ({
  label,
  placeholder,
  type,
  errors,
  value,
  onChange,
  max,
  min,
  plain,
}) => (
  <Box width={plain ? BoxWidth.Full : undefined} padding={{ bottom: SizesEnum.Medium }} column>
    {!plain && label && (
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <DoggoText variant={DoggoTextVariant.Callout}>{label}</DoggoText>
      </Box>
    )}
    <StyledInput
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={({ target: { value: nextValue, valueAsNumber } }) => onChange(nextValue)}
      max={max}
      min={min}
      plain={plain}
    />
    {!plain && (
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <DoggoText color="red" variant={DoggoTextVariant.Caption1}>
          {(errors || []).map((error, index) => error).join(", ")}
        </DoggoText>
      </Box>
    )}
  </Box>
);

Component.defaultProps = {
  type: InputTypes.Text,
};

export default Component;
