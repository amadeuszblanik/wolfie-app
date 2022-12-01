import { css } from "styled-components";
import Breakpoints from "../../settings/breakpoints";

type cssParams = Parameters<typeof css>;
const keys = Object.keys(Breakpoints) as Array<keyof typeof Breakpoints>;

export const mixin = keys.reduce((accumulator, label) => {
  accumulator[label] = (...args: cssParams) => css`
    @media (min-width: ${Breakpoints[label]}px) {
      ${css(...args)};
    }
  `;

  return accumulator;

  // @TODO: Change types
  // eslint-disable-next-line @typescript-eslint/ban-types
}, {} as Record<keyof typeof Breakpoints, Function>);

export default mixin;
