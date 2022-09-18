import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { darkenColorMixin, isDarkMixin, paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text from "../text";

interface StyledButtonProps {
  variant: keyof DefaultTheme["palette"];
}

interface ButtonProps {
  variant?: keyof DefaultTheme["palette"];
  children: string;
  onClick: () => void;
}

const HOVER_BACKGROUND_DARKEN_VALUE = 13;
const CLICK_BACKGROUND_DARKEN_VALUE = 33;

const StyledButton = styled.button<StyledButtonProps>`
  ${paddingMixin({ y: SizesEnum.Medium, x: SizesEnum.ExtraLarge })};
  color: ${({ theme, variant }) => (isDarkMixin(theme.palette[variant]) ? theme.palette.light : theme.palette.dark)};
  background: ${({ theme, variant }) => theme.palette[variant]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  appearance: none;

  &:hover {
    background: ${({ theme, variant }) => darkenColorMixin(theme.palette[variant], HOVER_BACKGROUND_DARKEN_VALUE)};
  }

  &:active {
    background: ${({ theme, variant }) => darkenColorMixin(theme.palette[variant], CLICK_BACKGROUND_DARKEN_VALUE)};
  }
`;

const Button: React.FunctionComponent<ButtonProps> = ({ children, variant, onClick }) => (
  <StyledButton variant={variant!} onClick={onClick}>
    <Text noBottomMargin>{children}</Text>
  </StyledButton>
);

Button.defaultProps = {
  variant: "blue",
};

export default Button;
