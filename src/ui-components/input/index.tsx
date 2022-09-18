import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { paddingMixin } from "../mixins";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Box from "../box";
import { DoggoText } from "../index";
import { DoggoTextVariant } from "../text";

interface Props {
  label: string;
  placeholder?: string;
  errors?: string[];
  type: HTMLInputTypeAttribute;
}

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
  color: var(--color-text);
  font-size: 1rem;
  background: var(--color-background);
  border: 2px solid ${({ theme }) => theme.palette.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

const Component: React.FunctionComponent<Props> = ({ label, placeholder, type, errors }) => (
  <Box padding={{ bottom: SizesEnum.Medium }} column>
    <Box padding={{ bottom: SizesEnum.Medium }}>
      <DoggoText variant={DoggoTextVariant.Callout}>{label}</DoggoText>
    </Box>
    <StyledInput placeholder={placeholder} type={type} />
    <Box padding={{ bottom: SizesEnum.Medium }}>
      <DoggoText color="red" variant={DoggoTextVariant.Caption1}>
        {(errors || []).map((error, index) => error).join(", ")}
      </DoggoText>
    </Box>
  </Box>
);

export default Component;
