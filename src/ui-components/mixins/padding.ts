// @TODO - Deprecate this in favor of padding
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Sizes from "../../settings/sizes";
import type { Padding } from "../types/padding";

const padding = (values: Padding): string => {
  if (typeof values === "string") {
    return `padding: ${Sizes[values]}px;`;
  }

  const css = [];

  if ("x" in values) {
    css.push(`padding-left: ${Sizes[values.x!]}px;`);
    css.push(`padding-right: ${Sizes[values.x!]}px;`);
  }

  if ("y" in values) {
    css.push(`padding-top: ${Sizes[values.y!]}px;`);
    css.push(`padding-bottom: ${Sizes[values.y!]}px;`);
  }

  if ("top" in values) {
    css.push(`padding-top: ${Sizes[values.top!]}px;`);
  }

  if ("right" in values) {
    css.push(`padding-right: ${Sizes[values.right!]}px;`);
  }

  if ("bottom" in values) {
    css.push(`padding-bottom: ${Sizes[values.bottom!]}px;`);
  }

  if ("left" in values) {
    css.push(`padding-left: ${Sizes[values.left!]}px;`);
  }

  return css.join("\n");
};

export default padding;
