import styled, { DefaultTheme } from "styled-components";
import type React from "react";
import Sizes, { SizesEnum } from "../../settings/sizes";
import type { Padding } from "../types/padding";
import { paddingMixin } from "../mixins";

interface StyledViewProps {
  background?: keyof DefaultTheme;
  borderRadius?: number;
  padding?: Padding;
  inline?: boolean;
}

const StyledView = styled.div<StyledViewProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  ${({ padding }) => padding && `${paddingMixin(padding)}`};
  background: ${({ theme, background }) => (background ? theme[background] : "transparent")};
  border-radius: ${({ borderRadius }) => (borderRadius ? ` ${borderRadius}px` : "0")};
`;

interface DoggoBoxProps {
  children: React.ReactNode;
  background?: keyof DefaultTheme;
  border?: SizesEnum;
  padding?: Padding;
  inline?: boolean;
}

const Component = ({ children, border, ...props }: DoggoBoxProps) => {
  return (
    <StyledView borderRadius={Sizes[border!]} {...props}>
      {children}
    </StyledView>
  );
};

Component.defaultProps = {
  border: SizesEnum.Small,
  padding: { x: SizesEnum.Medium, y: SizesEnum.Small },
};

export default Component;
