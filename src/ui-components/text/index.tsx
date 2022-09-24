import styled, { DefaultTheme } from "styled-components";
import Sizes, { SizesEnum } from "../../settings/sizes";
import React from "react";

export enum DoggoTextVariant {
  LargeTitle = "LARGE_TITLE",
  Title1 = "TITLE_1",
  Title2 = "TITLE_2",
  Title3 = "TITLE_3",
  Headline = "HEADLINE",
  Body = "BODY",
  Callout = "CALLOUT",
  Subhead = "SUBHEAD",
  Footnote = "FOOTNOTE",
  Caption1 = "CAPTION_1",
  Caption2 = "CAPTION_2",
}

export enum DoggoTextWeight {
  Thin = "100",
  UltraLight = "200",
  Light = "300",
  Regular = "400",
  Medium = "500",
  SemiBold = "600",
  Bold = "700",
  Heavy = "800",
  Black = "900",
}

export interface StyledTextProps {
  size: number;
  weight: string;
  color: keyof DefaultTheme["palette"];
  noBottomMargin?: boolean;
  textTransform?: string;
}

const StyledText = styled.p<StyledTextProps>`
  margin-bottom: ${({ noBottomMargin }) => (noBottomMargin ? "0" : `${Sizes[SizesEnum.Small]}px`)};
  color: var(--color-text, ${({ theme, color }) => theme.palette[color]});
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => size}px;
  text-transform: ${({ textTransform }) => textTransform};

  ${({ theme, color }) => color && `--color-text: ${theme.palette[color]}`};
`;

const variantSize: {
  [key in DoggoTextVariant]: { standard: number; leading: number };
} = {
  [DoggoTextVariant.LargeTitle]: { standard: 34, leading: 41 },
  [DoggoTextVariant.Title1]: { standard: 28, leading: 34 },
  [DoggoTextVariant.Title2]: { standard: 22, leading: 28 },
  [DoggoTextVariant.Title3]: { standard: 20, leading: 25 },
  [DoggoTextVariant.Headline]: { standard: 17, leading: 22 },
  [DoggoTextVariant.Body]: { standard: 17, leading: 22 },
  [DoggoTextVariant.Callout]: { standard: 16, leading: 21 },
  [DoggoTextVariant.Subhead]: { standard: 15, leading: 20 },
  [DoggoTextVariant.Footnote]: { standard: 13, leading: 18 },
  [DoggoTextVariant.Caption1]: { standard: 12, leading: 16 },
  [DoggoTextVariant.Caption2]: { standard: 11, leading: 13 },
};

export interface Props {
  children: React.ReactNode;
  variant?: DoggoTextVariant;
  weight?: DoggoTextWeight;
  leading?: boolean;
  noBottomMargin?: boolean;
  color?: keyof DefaultTheme["palette"];
  uppercase?: boolean;
}

const Component: React.FunctionComponent<Props> = ({
  children,
  variant,
  leading,
  weight,
  color,
  uppercase,
  ...props
}) => {
  const size = variantSize[variant || DoggoTextVariant.Body][leading ? "leading" : "standard"];

  return (
    <StyledText
      size={size}
      weight={weight!}
      color={color!}
      textTransform={uppercase ? "uppercase" : undefined}
      {...props}
    >
      {children}
    </StyledText>
  );
};

Component.defaultProps = {
  variant: DoggoTextVariant.Body,
  weight: DoggoTextWeight.Regular,
  color: "text",
};

export default Component;
