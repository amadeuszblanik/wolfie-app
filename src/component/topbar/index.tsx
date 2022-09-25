import styled from "styled-components";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  title: string;
  back?: boolean;
}

const StyledTopBar = styled(DoggoBox)`
  position: fixed;
  top: 0;
  left: 0;
`;

const Component: React.FunctionComponent<Props> = ({ title, back }) => {
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
        <DoggoBox alignX={FlexAlign.SpaceBetween} alignY={FlexAlign.Center} width={BoxWidth.Full}>
          {back ? (
            <DoggoButton onClick={router && router.back} variant="gray6">
              <FormattedMessage id="common.back" />
            </DoggoButton>
          ) : (
            <DoggoBox></DoggoBox>
          )}
          <DoggoText variant={DoggoTextVariant.Body}>{title}</DoggoText>
          <DoggoBox></DoggoBox>
        </DoggoBox>
      </DoggoContainer>
    </StyledTopBar>
  );
};

export default Component;
