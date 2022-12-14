export enum SizesEnum {
  ExtraSmall2 = "2xas",
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  Large2 = "2lg",
  ExtraLarge = "xl",
  ExtraLarge2 = "2xl",
}

const sizes: { [key in SizesEnum]: number } = {
  [SizesEnum.ExtraSmall2]: 0,
  [SizesEnum.ExtraSmall]: 2,
  [SizesEnum.Small]: 4,
  [SizesEnum.Medium]: 8,
  [SizesEnum.Large]: 16,
  [SizesEnum.Large2]: 24,
  [SizesEnum.ExtraLarge]: 32,
  [SizesEnum.ExtraLarge2]: 64,
};

export default sizes;
