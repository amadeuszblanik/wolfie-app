import React from "react";
import styled, { ThemePalette } from "styled-components";
import { backgroundMixin, darkenColorMixin, paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text from "../text";
import { isText } from "../../utils";

export enum ButtonSizes {
  Small = "small",
  Normal = "normal",
}

interface StyledButtonProps {
  variant?: ThemePalette;
  disabled?: boolean;
  size: ButtonSizes;
}

interface ButtonProps {
  variant?: ThemePalette;
  size?: ButtonSizes;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const PADDING_SIZES: { [key in ButtonSizes]: { x: SizesEnum; y: SizesEnum } } = {
  [ButtonSizes.Small]: { x: SizesEnum.Medium, y: SizesEnum.Small },
  [ButtonSizes.Normal]: { x: SizesEnum.ExtraLarge, y: SizesEnum.Medium },
};

const StyledButton = styled.button<StyledButtonProps>`
  ${({ size }) => paddingMixin(PADDING_SIZES[size])};
  ${({ variant, disabled }) => variant && backgroundMixin(!disabled ? variant : "gray")};
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  ${({ disabled }) => disabled && "pointer-events: none"};
  transition: background 0.2s ease-in-out;
  appearance: none;

  &:hover {
    background: ${({ theme, variant }) =>
      variant ? darkenColorMixin(theme.palette[variant], theme.darken.hover) : `var(--color-background-hover)`};
  }

  &:active {
    background: ${({ theme, variant }) =>
      variant ? darkenColorMixin(theme.palette[variant], theme.darken.active) : `var(--color-background-active)`};
  }
`;

const Button: React.FunctionComponent<ButtonProps> = ({ children, variant, size, onClick, disabled, type }) => (
  <StyledButton
    variant={variant}
    onClick={!disabled ? onClick : () => console.warn("Button disabled")}
    disabled={disabled}
    size={size || ButtonSizes.Normal}
    type={type}
  >
    {isText(children) ? <Text noBottomMargin>{children}</Text> : children}
  </StyledButton>
);

Button.defaultProps = {
  type: "button",
};

export default Button;
