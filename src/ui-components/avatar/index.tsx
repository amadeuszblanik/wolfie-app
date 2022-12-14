import styled from "styled-components";
import { useState } from "react";
import { SizesEnum } from "../../settings/sizes";
import Box, { FlexAlign } from "../box";
import { sizeMixin } from "../mixins";
import Loader from "../loader";
import { DoggoButton, DoggoIcon } from "../index";
import type React from "react";

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
  width: ${({ size }) => sizeMixin(size, AVATAR_SIZES)};
  height: ${({ size }) => sizeMixin(size, AVATAR_SIZES)};
  overflow: hidden;
  font-size: ${({ size }) => sizeMixin(size, AVATAR_FONT_SIZES)};
  background: ${({ theme }) => theme.palette.gray2};
`;

const StyledEdit = styled(Box)<{ hover: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1020;
  opacity: ${({ hover }) => (hover ? "1" : "0.33")};
  transition: opacity 0.2s ease-in-out;
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
  children?: string;
  alt?: string;
  size?: SizesEnum;
  onEdit?: () => void;
}

const Component = ({ children, alt, size, onEdit }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [hover, setHover] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleImageLoadedError = () => {
    setImageLoaded(true);
    setImageFailed(true);
  };

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <StyledBox alignX={FlexAlign.Center} alignY={FlexAlign.Center} size={size || SizesEnum.Medium}>
        {onEdit && (
          <StyledEdit hover={hover}>
            <DoggoButton onClick={onEdit} variant="gray5">
              <DoggoIcon icon="create" />
            </DoggoButton>
          </StyledEdit>
        )}
        {!children && "???????????"}
        {children && !imageLoaded && <Loader />}
        {children && !imageFailed && (
          <StyledImage
            visible={imageLoaded}
            src={children}
            alt={alt ?? ""}
            onLoad={handleImageLoaded}
            onError={handleImageLoadedError}
          />
        )}
        {children && imageFailed && "???????????"}
      </StyledBox>
    </div>
  );
};

export default Component;
