import styled, { DefaultTheme } from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import React from "react";
import AppsIcon from "./icons/apps-outline.svg";
import BarbellIcon from "./icons/barbell-outline.svg";
import BookIcon from "./icons/book-outline.svg";
import CheckmarkIcon from "./icons/checkmark-outline.svg";
import CloseCircleIcon from "./icons/close-circle-outline.svg";
import CloseIcon from "./icons/close-outline.svg";
import CogIcon from "./icons/cog-outline.svg";
import MedicalIcon from "./icons/medical-outline.svg";
import MedkitIcon from "./icons/medkit-outline.svg";
import WarningIcon from "./icons/warning-outline.svg";

export const Icons = [
  "apps",
  "barbell",
  "book",
  "checkmark",
  "close-circle",
  "close",
  "cog",
  "medical",
  "medkit",
  "warning",
];

export type DoggoIcons = typeof Icons[number];

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
      case "apps":
        return <AppsIcon />;
      case "barbell":
        return <BarbellIcon />;
      case "book":
        return <BookIcon />;
      case "checkmark":
        return <CheckmarkIcon />;
      case "close-circle":
        return <CloseCircleIcon />;
      case "close":
        return <CloseIcon />;
      case "cog":
        return <CogIcon />;
      case "medical":
        return <MedicalIcon />;
      case "medkit":
        return <MedkitIcon />;
      case "warning":
        return <WarningIcon />;
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
