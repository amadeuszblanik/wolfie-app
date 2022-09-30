import styled from "styled-components";
import { DoggoBox, DoggoContainer, DoggoGrid, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";
import React from "react";
import { GridAlign } from "../../ui-components/grid";
import { sizeMixin } from "../../ui-components/mixins";

interface Props {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const StyledTopBar = styled(DoggoBox)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1090;
  min-height: ${sizeMixin(SizesEnum.ExtraLarge2)};
`;

const StyledTopBarLeft = styled.div`
  justify-self: start;
`;

const StyledTopBarRight = styled.div`
  justify-self: end;
`;

const Component: React.FunctionComponent<Props> = ({ title, left, right }) => (
  <StyledTopBar
    alignX={FlexAlign.Center}
    alignY={FlexAlign.Center}
    width={BoxWidth.Full}
    padding={{ y: SizesEnum.Medium }}
    background="backgroundSecondary"
  >
    <DoggoContainer fullWidth>
      <DoggoGrid mobile={3} desktop={3} alignX={GridAlign.Center} alignY={GridAlign.Center}>
        <StyledTopBarLeft>{left}</StyledTopBarLeft>
        <DoggoText variant={DoggoTextVariant.Body}>{title}</DoggoText>
        <StyledTopBarRight>{right}</StyledTopBarRight>
      </DoggoGrid>
    </DoggoContainer>
  </StyledTopBar>
);

export default Component;
