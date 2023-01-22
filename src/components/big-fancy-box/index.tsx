import React from "react";
import { BmeBox, BmeIcon, BmeText } from "bme-ui";
import { DefaultTheme } from "styled-components";
import { IconName } from "bme-ui/dist/atoms/icon/types";
import { useMobile } from "../../hooks";

interface ErrorMessagesProps {
  icon: IconName;
  title: string;
  value: string;
  variant: keyof DefaultTheme["colors"];
}

const ICON_SIZE_MOBILE = 48;
const ICON_SIZE_DESKTOP = 64;

const Component: React.FC<ErrorMessagesProps> = ({ icon, title, value, variant }) => {
  const isMobile = useMobile();

  return (
    <BmeBox direction="column" width="100%" height="100%" padding="md" background={variant} rounded>
      <BmeBox margin="no|no|sm">
        <BmeIcon name={icon} size={isMobile ? ICON_SIZE_MOBILE : ICON_SIZE_DESKTOP} />
      </BmeBox>
      <BmeBox alignX="right" alignY="bottom" width="100%">
        <BmeBox margin="no|xs|no|no">
          <BmeText variant={isMobile ? "Body" : "Title2"} lineHeight="1">
            {title}
          </BmeText>
        </BmeBox>
        <BmeText variant={isMobile ? "Title2" : "LargeTitle"} lineHeight="1">
          {value}
        </BmeText>
      </BmeBox>
    </BmeBox>
  );
};

export default Component;
