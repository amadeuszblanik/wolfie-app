import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { darkenColorMixin, isDarkMixin, paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text from "../text";
import { isText } from "../../utils";

export enum ButtonSizes {
  Small = "small",
  Normal = "normal",
}

interface StyledButtonProps {
  variant: keyof DefaultTheme["palette"];
  disabled?: boolean;
  size: ButtonSizes;
}

interface ButtonProps {
  variant?: keyof DefaultTheme["palette"];
  size?: ButtonSizes;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const HOVER_BACKGROUND_DARKEN_VALUE = 13;
const CLICK_BACKGROUND_DARKEN_VALUE = 33;

const PADDING_SIZES: { [key in ButtonSizes]: { x: SizesEnum; y: SizesEnum } } = {
  [ButtonSizes.Small]: { x: SizesEnum.Medium, y: SizesEnum.Small },
  [ButtonSizes.Normal]: { x: SizesEnum.ExtraLarge, y: SizesEnum.Medium },
};

const StyledButton = styled.button<StyledButtonProps>`
  ${({ size }) => paddingMixin(PADDING_SIZES[size])};
  color: ${({ theme, variant }) => (isDarkMixin(theme.palette[variant]) ? theme.palette.light : theme.palette.dark)};
  background: ${({ theme, variant, disabled }) => (!disabled ? theme.palette[variant] : theme.palette.gray)};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  ${({ disabled }) => disabled && "pointer-events: none"};
  transition: background 0.2s ease-in-out;
  appearance: none;

  &:hover {
    background: ${({ theme, variant }) => darkenColorMixin(theme.palette[variant], HOVER_BACKGROUND_DARKEN_VALUE)};
  }

  &:active {
    background: ${({ theme, variant }) => darkenColorMixin(theme.palette[variant], CLICK_BACKGROUND_DARKEN_VALUE)};
  }
`;

const Button: React.FunctionComponent<ButtonProps> = ({ children, variant, size, onClick, disabled }) => (
  <StyledButton
    variant={variant!}
    onClick={!disabled ? onClick : () => console.warn("Button disabled")}
    disabled={disabled}
    size={size || ButtonSizes.Normal}
  >
    {isText(children) ? <Text noBottomMargin>{children}</Text> : children}
  </StyledButton>
);

Button.defaultProps = {
  variant: "blue",
};

export default Button;
