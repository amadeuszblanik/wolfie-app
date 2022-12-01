import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { toRgba } from "bme-utils";
import { SizesEnum } from "../../settings/sizes";
import Box, { FlexAlign } from "../box";
import { sizeMixin } from "../mixins";
import type React from "react";

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
  fullScreen: boolean | "component";
}

const StyledBox = styled(Box)<StyledBoxProps>`
  position: ${({ fullScreen }) => (fullScreen ? (fullScreen === "component" ? "absolute" : "fixed") : "relative")};
  top: 0;
  left: 0;
  ${({ fullScreen }) => fullScreen && `z-index: 9090; width: 100%; height: 100%;`}
  ${({ size }) => size && `font-size: ${sizeMixin(size, LOADER_SIZES)}`};
  background: ${({ theme, fullScreen }) =>
    fullScreen ? theme.palette.gray6 : toRgba(theme.palette.gray6, theme.opacity.modal)};
  backdrop-filter: blur(5px);
`;

interface Props {
  alt?: string;
  size?: SizesEnum;
  fullScreen?: boolean | "component";
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

  // @TODO Verify if this is the best way to do this - size
  return (
    <StyledBox
      inline
      alignX={FlexAlign.Center}
      alignY={FlexAlign.Center}
      size={size || SizesEnum.Medium}
      fullScreen={fullScreen || false}
    >
      <animated.div style={styles}>🐶</animated.div>
    </StyledBox>
  );
};

Component.defaultProps = {};

export default Component;
