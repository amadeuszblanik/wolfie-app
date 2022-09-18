import styled from 'styled-components';
import type React from 'react';
import Theme, { ThemeSchemesEnum, ThemeType } from '../../settings/theme';
import Sizes, { SizesEnum } from '../../settings/sizes';
import type { Padding } from '../types/padding';
import { paddingMixin } from '../mixins';

interface StyledViewProps {
  colorScheme: ThemeSchemesEnum;
  background?: ThemeType;
  borderRadius?: number;
  padding?: Padding;
}

const StyledView = styled.div<StyledViewProps>`
  ${({ padding }) => padding && `${paddingMixin(padding)}`};

  ${({ colorScheme, background }) =>
    background && `background: ${Theme[colorScheme][background]}`}};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}px`};
`;

interface DoggoBoxProps {
  children: React.ReactNode;
  background?: ThemeType;
  border?: SizesEnum;
  padding?: Padding;
}

const Component = ({
  children,
  background,
  border,
  padding,
}: DoggoBoxProps) => {
  const colorScheme = ThemeSchemesEnum.dark;

  return (
    <StyledView
      colorScheme={colorScheme}
      background={background}
      borderRadius={Sizes[border!]}
      padding={padding}
    >
      {children}
    </StyledView>
  );
};

Component.defaultProps = {
  border: SizesEnum.Small,
  padding: { x: SizesEnum.Medium, y: SizesEnum.Small },
};

export default Component;
