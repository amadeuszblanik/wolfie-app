/* eslint-disable no-magic-numbers */

const isDarkColorHex = (hex: string): boolean => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq < 128;
};

const isDarkColorRgb = (rgb: string): boolean => {
  // Returns true if dark
  const rgbMatch = rgb.match(/rgba?\(([^)]+)\)/);

  if (!rgbMatch) {
    throw new Error("Invalid rgb string");
  }

  const [r, g, b] = rgbMatch[1].split(/ *, */).map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

const isDarkColor = (colour: string): boolean => {
  if (colour.startsWith("#")) {
    return isDarkColorHex(colour);
  }

  if (colour.startsWith("rgb")) {
    return isDarkColorRgb(colour);
  }

  throw new Error("Invalid colour string");
};

export default isDarkColor;
