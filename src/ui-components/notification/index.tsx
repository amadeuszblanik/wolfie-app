import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { toRgba } from "bme-utils";
import { paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text, { DoggoTextVariant, TextAlignment } from "../text";
import Avatar from "../avatar";
import Box, { BoxWidth } from "../box";
import Button, { ButtonSizes } from "../button";
import Icon from "../icon";
import { DEFAULT_NOTIFICATION_ON_SCREEN_TIME } from "../../settings/globals";
import { Timer } from "../../utils";

interface Props {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  onClose: () => void;
}

const StyledNotification = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 5px 10px 0 ${({ theme }) => toRgba(theme.palette.gray5, theme.opacity.boxShadows)};

  &:hover *::after,
  &:active *::after {
    animation-play-state: paused;
  }
`;

const StyledNotificationTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Medium, y: SizesEnum.Medium })};
  background-color: ${({ theme }) => theme.palette.gray6};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const StyledNotificationBody = styled.div`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Medium, y: SizesEnum.Medium })};
`;

const StyledNotificationProgressbar = styled.div`
  @keyframes progressbar {
    0% {
      width: 100%;
    }

    100% {
      width: 0;
    }
  }

  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.backgroundSecondary};

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.palette.primary};
    animation: progressbar ${DEFAULT_NOTIFICATION_ON_SCREEN_TIME}ms linear forwards;
    content: "";
  }
`;

const Component: React.FunctionComponent<Props> = ({ title, body, icon, image, onClose }) => {
  const timer = new Timer(onClose, DEFAULT_NOTIFICATION_ON_SCREEN_TIME);

  const handleHover = () => {
    timer.pause();
  };

  const handleBlur = () => {
    timer.resume();
  };

  return (
    <StyledNotification
      onMouseOver={handleHover}
      onMouseLeave={handleBlur}
      onTouchStart={handleHover}
      onTouchEnd={handleBlur}
    >
      <StyledNotificationTitle>
        <Box padding={{ right: SizesEnum.Medium }}>
          <Avatar size={SizesEnum.Small}>{icon ?? "/notification-icon.png"}</Avatar>
        </Box>
        <Box width={BoxWidth.Full} padding={{ right: SizesEnum.Medium }}>
          <Text variant={DoggoTextVariant.Callout} align={TextAlignment.Left}>
            {title}
          </Text>
        </Box>
        <Button size={ButtonSizes.Small} variant="backgroundSecondary" onClick={onClose}>
          <Icon icon="close-circle" size={SizesEnum.Large} />
        </Button>
      </StyledNotificationTitle>
      <StyledNotificationBody>
        <Text variant={DoggoTextVariant.Body}>{body}</Text>
        {image && <Image src={image} alt="" width={200} height={200} />}
      </StyledNotificationBody>
      <StyledNotificationProgressbar />
    </StyledNotification>
  );
};

export default Component;
