import type { SizesEnum } from "../../settings/sizes";

interface PaddingSizesXY {
  x?: SizesEnum;
  y?: SizesEnum;
}

interface PaddingSizes {
  top?: SizesEnum;
  right?: SizesEnum;
  bottom?: SizesEnum;
  left?: SizesEnum;
}

export type Padding = SizesEnum | PaddingSizesXY | PaddingSizes;
