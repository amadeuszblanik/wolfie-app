import { css, DefaultTheme, ThemePalette } from "styled-components";
import { firstElement } from "bme-utils";
import { darkenColorMixin } from "./index";
import isDark from "./isDark";

const GRADIENT_ELEMENTS_LENGTH = 2;

const background = (colors: ThemePalette | ThemePalette[]) => {
  const isGradient = Array.isArray(colors) && colors.length >= GRADIENT_ELEMENTS_LENGTH;

  if (isGradient) {
    return css`
      background: linear-gradient(
        45deg,
        ${({ theme }) => colors.map((color: keyof DefaultTheme["palette"]) => theme.palette[color]).join(", ")}
      );
      --color-background: linear-gradient(
        45deg,
        ${({ theme }) => colors.map((color: keyof DefaultTheme["palette"]) => theme.palette[color]).join(", ")}
      );
      --color-background-hover: linear-gradient(
        45deg,
        ${({ theme }) =>
          colors
            .map((color: keyof DefaultTheme["palette"]) => darkenColorMixin(theme.palette[color], theme.darken.hover))
            .join(", ")}
      );
      --color-background-active: linear-gradient(
        45deg,
        ${({ theme }) =>
          colors
            .map((color: keyof DefaultTheme["palette"]) => darkenColorMixin(theme.palette[color], theme.darken.active))
            .join(", ")}
      );
      --color-text: ${({ theme }) =>
        colors.some((color) => isDark(theme.palette[color])) ? theme.palette.light : theme.palette.dark};
    `;
  }

  const color: ThemePalette = Array.isArray(colors) ? firstElement(colors) || "background" : (colors as ThemePalette);

  return css`
    background: ${({ theme }) => theme.palette[color]};
    --color-background: ${({ theme }) => theme.palette[color]};
    --color-background-hover: ${({ theme }) => darkenColorMixin(theme.palette[color], theme.darken.hover)};
    --color-background-active: ${({ theme }) => darkenColorMixin(theme.palette[color], theme.darken.active)};
    --color-text: ${({ theme }) => (isDark(theme.palette[color]) ? theme.palette.light : theme.palette.dark)};
  `;
};

export default background;
