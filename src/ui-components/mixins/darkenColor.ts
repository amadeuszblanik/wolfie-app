/* eslint-disable no-magic-numbers */
const darkenColor = (rgb: string, amount: number) => {
  const rgbMatch = rgb.match(/rgba?\(([^)]+)\)/);

  if (!rgbMatch) {
    throw new Error("Invalid rgb string");
  }

  const [r, g, b] = rgbMatch[1].split(/ *, */).map(Number);
  return `rgb(${r - amount}, ${g - amount}, ${b - amount})`;
};

export default darkenColor;
