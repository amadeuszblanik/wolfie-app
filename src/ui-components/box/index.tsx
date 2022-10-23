import styled, { ThemePalette } from "styled-components";
import { useEffect, useRef } from "react";
import Sizes, { SizesEnum } from "../../settings/sizes";
import { backgroundMixin, colorTextMixin, paddingMixin } from "../mixins";
import type React from "react";
import type { Padding } from "../types/padding";

export enum FlexAlign {
  Left = "flex-start",
  Right = "flex-end",
  Center = "center",
  Top = "flex-start",
  Bottom = "flex-end",
  SpaceBetween = "space-between",
  SpaceAround = "space-around",
  SpaceEvenly = "space-evenly",
}

export enum BoxWidth {
  Full = "100%",
}

interface StyledViewProps {
  background?: ThemePalette | ThemePalette[];
  borderRadius?: number;
  width?: string;
  padding?: Padding;
  inline?: boolean;
  column?: boolean;
  justifyContent?: FlexAlign;
  alignItems?: FlexAlign;
  wrap?: boolean;
}

interface DoggoBoxProps {
  children?: React.ReactNode;
  background?: ThemePalette | ThemePalette[];
  border?: SizesEnum;
  padding?: Padding;
  width?: BoxWidth;
  inline?: boolean;
  column?: boolean;
  alignX?: FlexAlign;
  alignY?: FlexAlign;
  onSizeChange?: (size: { width: number; height: number }) => void;
  wrap?: boolean;
}

const StyledView = styled.div<StyledViewProps>`
  position: relative;
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  ${({ justifyContent }) => (justifyContent ? `justify-content: ${justifyContent}` : "")};
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems}` : "")};
  ${({ wrap }) => wrap && "flex-wrap: wrap"};
  ${({ width }) => width && `width: ${width}`};
  ${({ padding }) => padding && `${paddingMixin(padding)}`};
  ${({ background }) => background && colorTextMixin(background)};
  ${({ background }) => background && backgroundMixin(background)};
  border-radius: ${({ theme, borderRadius }) => (borderRadius ? ` ${borderRadius}px` : theme.borderRadius)};
`;

const Component = ({ children, border, column, alignX, alignY, onSizeChange, ...props }: DoggoBoxProps) => {
  const justifyContent = column ? alignY : alignX;
  const alignItems = column ? alignX : alignY;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window || !onSizeChange) {
      return;
    }

    const handleResize = () => {
      const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };
      onSizeChange({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  // @TODO Verify that this is the correct way to handle this — Border radius
  return (
    <StyledView
      ref={ref}
      borderRadius={Sizes[border || SizesEnum.Small]}
      justifyContent={justifyContent}
      alignItems={alignItems}
      column={column}
      {...props}
    >
      {children}
    </StyledView>
  );
};

export default Component;
