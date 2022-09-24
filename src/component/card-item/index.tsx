import { DoggoBox, DoggoIcon, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import React from "react";
import { DoggoTextVariant } from "../../ui-components/text";
import { ThemePalette } from "styled-components";
import { DoggoIcons } from "../../ui-components/icon";

interface Props {
  children: React.ReactNode | string;
  icon: DoggoIcons;
  value: number | string;
  background: ThemePalette | ThemePalette[];
}

const Component: React.FunctionComponent<Props> = ({ children, icon, value, background }) => {
  return (
    <DoggoBox
      width={BoxWidth.Full}
      padding={{ y: SizesEnum.ExtraLarge, x: SizesEnum.ExtraLarge }}
      background={background}
      column
    >
      <DoggoBox alignX={FlexAlign.Left} padding={{ bottom: SizesEnum.Large }}>
        <DoggoIcon icon={icon} size={SizesEnum.ExtraLarge2} />
      </DoggoBox>
      <DoggoBox alignX={FlexAlign.Right} alignY={FlexAlign.Bottom} width={BoxWidth.Full}>
        <DoggoText noBottomMargin>{children}</DoggoText>&nbsp;&nbsp;
        <DoggoText variant={DoggoTextVariant.LargeTitle} noBottomMargin>
          {value}
        </DoggoText>
      </DoggoBox>
    </DoggoBox>
  );
};

export default Component;
