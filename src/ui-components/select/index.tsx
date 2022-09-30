import React from "react";
import styled from "styled-components";
import { paddingMixin } from "../mixins";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Box, { BoxWidth } from "../box";
import { DoggoText } from "../index";
import { DoggoTextVariant } from "../text";
import Icon from "../icon";

interface ListItem {
  id: string | number;
  label: string;
}

interface Props {
  value: string | number | undefined;
  onChange: (nextValue: string | number | undefined) => void;
  list: ListItem[];
  label?: string;
  plain?: boolean;
  nullable?: boolean;
  placeholder?: string;
  errors?: string[];
}

interface StyledInputProps {
  plain?: boolean;
}

const StyledSelect = styled.select<StyledInputProps>`
  width: 100%;
  ${paddingMixin({
    top: SizesEnum.Medium,
    right: SizesEnum.ExtraLarge,
    bottom: SizesEnum.Medium,
    left: SizesEnum.Large,
  })};
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  text-align: ${({ plain }) => (plain ? "right" : "left")};
  text-indent: 1px;
  text-overflow: "";
  background: var(--color-background);
  border: ${({ plain, theme }) => (!plain ? `2px solid ${theme.palette.gray}` : "none")};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;
  appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

const StyledSelectWrapper = styled.div`
  position: relative;
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
`;

const StyledSelectIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const Component: React.FunctionComponent<Props> = ({
  value,
  onChange,
  list,
  label,
  placeholder,
  plain,
  nullable,
  errors,
}) => (
  <Box width={plain ? BoxWidth.Full : undefined} padding={{ bottom: SizesEnum.Medium }} column>
    {!plain && label && (
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <DoggoText variant={DoggoTextVariant.Callout}>{label}</DoggoText>
      </Box>
    )}
    <StyledSelectWrapper>
      <StyledSelect
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value: nextValue } }) => onChange(nextValue)}
        plain={plain}
      >
        <option disabled={!nullable} selected={!value}>
          {label}
        </option>
        {list.map(({ id, label: itemLabel }) => (
          <option key={id} value={id} selected={value === id}>
            {itemLabel}
          </option>
        ))}
      </StyledSelect>
      <StyledSelectIcon>
        <Icon icon="chevron-down" />
      </StyledSelectIcon>
    </StyledSelectWrapper>
    {!plain && (
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <DoggoText color="red" variant={DoggoTextVariant.Caption1}>
          {(errors || []).map((error) => error).join(", ")}
        </DoggoText>
      </Box>
    )}
  </Box>
);

export default Component;
