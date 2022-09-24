import styled from "styled-components";
import type React from "react";
import { useState } from "react";
import { SizesEnum } from "../../settings/sizes";
import Box, { FlexAlign } from "../box";
import { sizeMixin } from "../mixins";
import Loader from "../loader";

const AVATAR_SIZES: { [key in SizesEnum]: number } = {
  [SizesEnum.ExtraSmall2]: 16,
  [SizesEnum.ExtraSmall]: 24,
  [SizesEnum.Small]: 32,
  [SizesEnum.Medium]: 48,
  [SizesEnum.Large]: 64,
  [SizesEnum.Large2]: 80,
  [SizesEnum.ExtraLarge]: 120,
  [SizesEnum.ExtraLarge2]: 240,
};

const AVATAR_FONT_SIZES: { [key in SizesEnum]: number } = {
  [SizesEnum.ExtraSmall2]: 14,
  [SizesEnum.ExtraSmall]: 18,
  [SizesEnum.Small]: 24,
  [SizesEnum.Medium]: 32,
  [SizesEnum.Large]: 48,
  [SizesEnum.Large2]: 64,
  [SizesEnum.ExtraLarge]: 80,
  [SizesEnum.ExtraLarge2]: 80,
};

const StyledBox = styled(Box)<{ size: SizesEnum }>`
  position: relative;
  overflow: hidden;
  width: ${({ size }) => sizeMixin(size, AVATAR_SIZES)};
  height: ${({ size }) => sizeMixin(size, AVATAR_SIZES)};
  font-size: ${({ size }) => sizeMixin(size, AVATAR_FONT_SIZES)};
  background: ${({ theme }) => theme.palette.gray2};
`;

const StyledImage = styled.img<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
`;

interface Props {
  children: string;
  alt?: string;
  size?: SizesEnum;
}

const Component = ({ children, alt, size }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageLoaded = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.debug("Image loaded", event);
    setImageLoaded(true);
  };

  const handleImageLoadedError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.debug("Image loaded error", event);
    setImageLoaded(true);
    setImageFailed(true);
  };

  return (
    <StyledBox alignX={FlexAlign.Center} alignY={FlexAlign.Center} size={size!}>
      {!imageLoaded && <Loader />}
      {!imageFailed && (
        <StyledImage
          visible={imageLoaded}
          src={children}
          alt={alt ?? ""}
          onLoad={handleImageLoaded}
          onError={handleImageLoadedError}
        />
      )}
      {imageFailed && "🐕‍🦺"}
    </StyledBox>
  );
};

Component.defaultProps = {
  size: SizesEnum.Medium,
};

export default Component;
