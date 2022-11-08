import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toRgba } from "bme-utils";
import Box, { FlexAlign } from "../box";
import { SizesEnum } from "../../settings/sizes";
import Loader from "../loader";
import type React from "react";

const CANVAS_INIT_DRAW_IMAGE_DX = 0;
const CANVAS_INIT_DRAW_IMAGE_DY = 0;
const CANVAS_DX_DIVIDER = 2;

interface StyledCropCanvasProps {
  componentWidth: number;
  componentHeight: number;
}

interface Props {
  width: number;
  height: number;
  componentWidth: number;
  src: string;
  onCrop: (data: string) => void;
}

const StyledLoaderWrapper = styled.div<StyledCropCanvasProps>`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ componentWidth }) => componentWidth}px;
  height: ${({ componentHeight }) => componentHeight}px;
  background-color: ${({ theme }) => toRgba(theme.palette.gray5, theme.opacity.modal)};
  transform: translateX(-50%);
  backdrop-filter: blur(5px);
`;

const StyledCropCanvas = styled.canvas<StyledCropCanvasProps>`
  width: ${({ componentWidth }) => componentWidth}px;
  height: ${({ componentHeight }) => componentHeight}px;
  background-color: ${({ theme }) => theme.palette.gray5};
`;

const Component = ({ width, height, src, onCrop, componentWidth }: Props) => {
  const cropRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState(new Image());
  const [loader, setLoader] = useState(false);

  const ratio = width / height;

  const generateOutput = () => {
    if (!cropRef || !cropRef.current) {
      return;
    }

    const canvas = cropRef.current;
    const imgOutput = canvas.toDataURL("image/png");

    onCrop(imgOutput);
    setLoader(false);
  };

  const handleImageOnLoad = () => {
    if (!cropRef || !cropRef.current) {
      return;
    }

    const ctx = cropRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;

    const imageScale = Math.max(width / imageWidth, height / imageHeight);

    const scaledWidth = imageWidth * imageScale;
    const scaledHeight = imageHeight * imageScale;

    const dx = (width - scaledWidth) / CANVAS_DX_DIVIDER;
    const dy = (height - scaledHeight) / CANVAS_DX_DIVIDER;

    ctx.drawImage(image, dx, dy, scaledWidth, scaledHeight);
    generateOutput();
  };

  const clearCanvas = () => {
    if (!cropRef || !cropRef.current) {
      return;
    }

    const ctx = cropRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(CANVAS_INIT_DRAW_IMAGE_DX, CANVAS_INIT_DRAW_IMAGE_DY, width, height);
  };

  useEffect(() => {
    setLoader(true);
    const newImage = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = handleImageOnLoad;

    clearCanvas();
    setImage(newImage);
  }, [src, setLoader]);

  return (
    <Box alignX={FlexAlign.Center} alignY={FlexAlign.Center}>
      {loader && (
        <StyledLoaderWrapper
          componentWidth={componentWidth || width}
          componentHeight={componentWidth * ratio || height}
        >
          <Loader />
        </StyledLoaderWrapper>
      )}
      <StyledCropCanvas
        ref={cropRef}
        width={width}
        height={height}
        componentWidth={componentWidth || width}
        componentHeight={componentWidth * ratio || height}
      />
    </Box>
  );
};

Component.defaultProps = {
  size: SizesEnum.Medium,
};

export default Component;
