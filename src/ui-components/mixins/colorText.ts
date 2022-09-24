import { css, DefaultTheme, ThemePalette } from "styled-components";
import { firstElement } from "bme-utils";
import isDarkColor from "./isDark";

const GRADIENT_ELEMENTS_LENGTH = 2;

const colorText = (colors: ThemePalette | ThemePalette[]) => {
  const isGradient = Array.isArray(colors) && colors.length >= GRADIENT_ELEMENTS_LENGTH;

  if (isGradient) {
    return css`
      color: ${({ theme }) =>
        colors.some((color: keyof DefaultTheme["palette"]) => isDarkColor(theme.palette[color]))
          ? theme.palette.light
          : theme.palette.dark};
      --color-text: ${({ theme }) =>
        colors.some((color: keyof DefaultTheme["palette"]) => isDarkColor(theme.palette[color]))
          ? theme.palette.light
          : theme.palette.dark};
    `;
  }

  const color: ThemePalette = Array.isArray(colors) ? firstElement(colors) || "text" : colors;

  return css`
    color: ${({ theme }) => (isDarkColor(theme.palette[color]) ? theme.palette.light : theme.palette.dark)};
    --color-text: ${({ theme }) => (isDarkColor(theme.palette[color]) ? theme.palette.light : theme.palette.dark)};
  `;
};

export default colorText;
