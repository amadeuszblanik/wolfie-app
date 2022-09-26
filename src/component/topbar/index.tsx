import styled from "styled-components";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoGrid, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import React from "react";
import { GridAlign } from "../../ui-components/grid";

interface Props {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const StyledTopBar = styled(DoggoBox)`
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledTopBarLeft = styled.div`
  justify-self: start;
`;

const StyledTopBarRight = styled.div`
  justify-self: end;
`;

const Component: React.FunctionComponent<Props> = ({ title, left, right }) => {
  const router = useRouter();

  return (
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
};

export default Component;
