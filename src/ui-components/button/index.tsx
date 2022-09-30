import React, { ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { darkenColorMixin, isDarkMixin, paddingMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text from "../text";
import { FormattedMessage } from "react-intl";

interface StyledButtonProps {
  variant: keyof DefaultTheme["palette"];
  disabled?: boolean;
}

interface ButtonProps {
  variant?: keyof DefaultTheme["palette"];
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const HOVER_BACKGROUND_DARKEN_VALUE = 13;
const CLICK_BACKGROUND_DARKEN_VALUE = 33;

const StyledButton = styled.button<StyledButtonProps>`
  ${paddingMixin({ y: SizesEnum.Medium, x: SizesEnum.ExtraLarge })};
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

const Button: React.FunctionComponent<ButtonProps> = ({ children, variant, onClick, disabled }) => {
  const childrenType = (children as ReactElement | null)?.type === FormattedMessage;
  const isText = typeof children === "string" || childrenType;

  return (
    <StyledButton
      variant={variant!}
      onClick={!disabled ? onClick : () => console.warn("Button disabled")}
      disabled={disabled}
    >
      {isText ? <Text noBottomMargin>{children}</Text> : children}
    </StyledButton>
  );
};

Button.defaultProps = {
  variant: "blue",
};

export default Button;
