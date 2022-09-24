import Sizes, { SizesEnum } from "../../settings/sizes";

const size = (value: SizesEnum, sizes = Sizes): string => `${sizes[value]}px`;

export default size;
