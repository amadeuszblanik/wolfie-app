import { css, DefaultTheme, ThemePalette } from "styled-components";
import { firstElement } from "bme-utils";

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
    `;
  }

  const color: ThemePalette = Array.isArray(colors) ? firstElement(colors) || "background" : (colors as ThemePalette);

  return css`
    background: ${({ theme }) => theme.palette[color]};
    --color-background: ${({ theme }) => theme.palette[color]};
  `;
};

export default background;
