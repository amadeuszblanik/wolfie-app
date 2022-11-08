import React from "react";
import styled from "styled-components";
import { SizesEnum } from "../../settings/sizes";
import { backgroundMixin, paddingMixin } from "../mixins";
import { DoggoText } from "../index";
import Box from "../box";
import { DoggoTextVariant, DoggoTextWeight } from "../text";

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
  label?: string;
}

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${paddingMixin({ x: SizesEnum.ExtraLarge, y: SizesEnum.Large })}
  ${backgroundMixin("backgroundSecondary")};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Component: React.FunctionComponent<Props> = ({ children, onSubmit, label }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {label && (
        <Box padding={{ bottom: SizesEnum.Large }}>
          <DoggoText variant={DoggoTextVariant.Headline} leading weight={DoggoTextWeight.SemiBold}>
            {label}
          </DoggoText>
        </Box>
      )}
      {children}
    </StyledForm>
  );
};

export default Component;
