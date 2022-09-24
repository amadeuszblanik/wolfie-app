import styled from "styled-components";
import type React from "react";
import { SizesEnum } from "../../settings/sizes";
import Box, { BoxWidth, FlexAlign } from "../box";
import { sizeMixin } from "../mixins";
import { animated, useSpring } from "react-spring";
import { toRgba } from "bme-utils";

const LOADER_SIZES: { [key in SizesEnum]: number } = {
  [SizesEnum.ExtraSmall2]: 16,
  [SizesEnum.ExtraSmall]: 24,
  [SizesEnum.Small]: 32,
  [SizesEnum.Medium]: 48,
  [SizesEnum.Large]: 64,
  [SizesEnum.Large2]: 80,
  [SizesEnum.ExtraLarge]: 120,
  [SizesEnum.ExtraLarge2]: 240,
};

interface StyledBoxProps {
  size?: SizesEnum;
  fullScreen: boolean;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  position: ${({ fullScreen }) => (fullScreen ? "fixed" : "relative")};
  top: 0;
  left: 0;
  ${({ fullScreen }) => fullScreen && `width: 100%; height: 100%;`}
  ${({ size }) => size && `font-size: ${sizeMixin(size, LOADER_SIZES)}`};
  background: ${({ theme, fullScreen }) =>
    fullScreen ? theme.palette.gray6 : toRgba(theme.palette.gray6, theme.opacity.modal)};
  backdrop-filter: blur(5px);
`;

interface Props {
  alt?: string;
  size?: SizesEnum;
  fullScreen?: boolean;
}

const Component = ({ size, fullScreen }: Props) => {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, transform: "scale(1.2)" },
      { opacity: 0.3, transform: "scale(0.8)" },
    ],
    from: { opacity: 0.3, transform: "scale(0.8)" },
  });

  return (
    <StyledBox inline alignX={FlexAlign.Center} alignY={FlexAlign.Center} size={size!} fullScreen={fullScreen!}>
      <animated.div style={styles}>🐶</animated.div>
    </StyledBox>
  );
};

Component.defaultProps = {};

export default Component;
