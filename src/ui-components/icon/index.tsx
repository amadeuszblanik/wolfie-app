import styled, { DefaultTheme } from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import React from "react";
import CloseIcon from "./icons/close-outline.svg";
import CloseCircleIcon from "./icons/close-circle-outline.svg";
import WarningIcon from "./icons/warning-outline.svg";
import CheckmarkIcon from "./icons/checkmark-outline.svg";

export const Icons = ["close", "close-circle", "warning", "checkmark"];

interface Props {
  icon: typeof Icons[number];
  size?: SizesEnum;
  color?: keyof DefaultTheme["palette"];
}

interface StyledIconProps {
  fullWidth?: boolean;
  size: number;
  color?: keyof DefaultTheme["palette"];
}

const StyledIcon = styled.div<StyledIconProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  color: var(--color-text, ${({ theme, color }) => theme.palette[color ?? "text"]});

  ${({ theme, color }) => color && `--color-text: ${theme.palette[color]}`};
`;

const Component: React.FunctionComponent<Props> = ({ icon, size, ...props }) => {
  const iconToShow = () => {
    switch (icon) {
      case "close":
        return <CloseIcon />;
      case "close-circle":
        return <CloseCircleIcon />;
      case "warning":
        return <WarningIcon />;
      case "checkmark":
        return <CheckmarkIcon />;
      default:
        return null;
    }
  };

  return (
    <StyledIcon size={size ? Sizes[size] : Sizes[SizesEnum.Large]} {...props}>
      {iconToShow()}
    </StyledIcon>
  );
};

export default Component;
