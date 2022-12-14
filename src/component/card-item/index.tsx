import styled, { ThemePalette } from "styled-components";
import React from "react";
import { DoggoBox, DoggoIcon, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";
import { DoggoIcons } from "../../ui-components/icon";

interface Props {
  children: React.ReactNode | string;
  icon: DoggoIcons;
  value: number | string;
  background: ThemePalette | ThemePalette[];
  loading?: boolean;
}

const StyledLabels = styled(DoggoBox)`
  overflow: hidden;
`;

const Component: React.FunctionComponent<Props> = ({ children, icon, value, background, loading }) => (
  <DoggoBox
    width={BoxWidth.Full}
    padding={{ y: SizesEnum.ExtraLarge, x: SizesEnum.ExtraLarge }}
    background={background}
    column
  >
    <DoggoBox alignX={FlexAlign.Left} padding={{ bottom: SizesEnum.Large }}>
      <DoggoIcon icon={icon} size={SizesEnum.ExtraLarge2} />
    </DoggoBox>
    <StyledLabels alignX={FlexAlign.Right} alignY={FlexAlign.Bottom} width={BoxWidth.Full}>
      <DoggoText noBottomMargin>{children}</DoggoText>&nbsp;&nbsp;
      <DoggoText variant={DoggoTextVariant.LargeTitle} noBottomMargin>
        {!loading ? value : <DoggoPlaceholder />}
      </DoggoText>
    </StyledLabels>
  </DoggoBox>
);

export default Component;
