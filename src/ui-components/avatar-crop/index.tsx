import type React from "react";
import { SizesEnum } from "../../settings/sizes";
import Box, { FlexAlign } from "../box";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { clamp, firstElement } from "bme-utils";
import debounce from "lodash.debounce";

const CANVAS_INIT_DRAW_IMAGE_DX = 0;
const CANVAS_INIT_DRAW_IMAGE_DY = 0;
const IMAGE_INIT_SCALE = 1;
const IMAGE_MIN_SCALE = 1;
const IMAGE_MAX_SCALE = Infinity;
const WHEEL_DELTA_Y_DIVIDER = 1000;
const DEBOUNCE_ON_CROP = 1000;

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface ImageOnLoadEvent extends Event {
  path?: HTMLImageElement[];
  target?: HTMLImageElement;
}

const StyledCropCanvas = styled.canvas<StyledCropCanvasProps>`
  width: ${({ componentWidth }) => componentWidth}px;
  height: ${({ componentHeight }) => componentHeight}px;
  background-color: ${({ theme }) => theme.palette.backgroundSecondary};
  cursor: move;
`;

const Component = ({ width, height, src, onCrop, componentWidth }: Props) => {
  const cropRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState(new Image());
  const [imageWidth, setImageWidth] = useState(NaN);
  const [imageHeight, setImageHeight] = useState(NaN);
  const [imageX, setImageX] = useState(CANVAS_INIT_DRAW_IMAGE_DX);
  const [imageY, setImageY] = useState(CANVAS_INIT_DRAW_IMAGE_DY);
  const [imageScale, setImageScale] = useState(IMAGE_INIT_SCALE);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [moveActive, setMoveActive] = useState<{ x: number; y: number }>();

  const ratio = width / height;
  const imageToCanvasScale = imageWidth / width;

  const updateOutput = () => {
    const canvas = cropRef?.current;

    if (!canvas) {
      return;
    }

    const jpg = canvas.toDataURL("image/png");

    onCrop(jpg);
  };

  const debounceUpdateOutput = useCallback(debounce(updateOutput, DEBOUNCE_ON_CROP), []);

  useEffect(() => {
    const canvas = cropRef?.current;

    if (canvas) {
      setCtx(canvas.getContext("2d"));
    }
  }, [cropRef]);

  const imageOnLoad = useCallback((event: Event) => {
    const imageEvent = event as ImageOnLoadEvent;
    const imageElement = firstElement([...(imageEvent.path || []), imageEvent.target]);

    if (!imageElement) {
      throw new Error("Image element not found");
    }

    setImageWidth(imageElement.width);
    setImageHeight(imageElement.height);
    setImage(imageElement);
  }, []);

  useEffect(() => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(CANVAS_INIT_DRAW_IMAGE_DX, CANVAS_INIT_DRAW_IMAGE_DY, width, height);
    ctx.drawImage(
      image,
      imageX,
      imageY,
      (width * imageToCanvasScale) / imageScale,
      (height * imageToCanvasScale) / imageScale,
      CANVAS_INIT_DRAW_IMAGE_DX,
      CANVAS_INIT_DRAW_IMAGE_DX,
      width,
      height,
    );
  }, [ctx, width, height, image, imageWidth, imageHeight, imageX, imageY, imageScale, imageToCanvasScale]);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = src;
    nextImage.onload = imageOnLoad;
    nextImage.crossOrigin = "anonymous";
  }, [src, imageOnLoad]);

  const handleMoveImage = useCallback(
    (moveX: number, moveY: number) => {
      if (!ctx) {
        return;
      }

      setImageX(imageX - moveX);
      setImageY(imageY - moveY);
    },
    [ctx, imageX, imageY],
  );

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = cropRef?.current;

    if (!canvas) {
      return;
    }

    const mouseX = event.pageX - canvas.offsetLeft;
    const mouseY = event.pageY - canvas.offsetTop;

    setMoveActive({ x: mouseX, y: mouseY });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = cropRef?.current;

    if (!canvas) {
      return;
    }

    const touch = firstElement(Array.from(event.touches));

    if (!touch) {
      setMoveActive(undefined);

      return;
    }

    const mouseX = touch.pageX - canvas.offsetLeft;
    const mouseY = touch.pageY - canvas.offsetTop;

    setMoveActive({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = () => {
    setMoveActive(undefined);
  };

  const handleTouchEnd = () => {
    setMoveActive(undefined);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = cropRef?.current;

      if (!canvas || !moveActive) {
        return;
      }

      const mouseX = event.pageX - canvas.offsetLeft;
      const mouseY = event.pageY - canvas.offsetTop;

      const moveX = mouseX - moveActive.x;
      const moveY = mouseY - moveActive.y;

      handleMoveImage(moveX, moveY);
      debounceUpdateOutput();
    },
    [moveActive],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = cropRef?.current;

      if (!canvas || !moveActive) {
        return;
      }

      const touch = firstElement(Array.from(event.touches));

      if (!touch) {
        setMoveActive(undefined);

        return;
      }

      const mouseX = touch.pageX - canvas.offsetLeft;
      const mouseY = touch.pageY - canvas.offsetTop;

      const moveX = mouseX - moveActive.x;
      const moveY = mouseY - moveActive.y;

      handleMoveImage(moveX, moveY);
      debounceUpdateOutput();
    },
    [moveActive],
  );

  const handleMouseScroll = (event: React.WheelEvent<HTMLCanvasElement> | undefined) => {
    const deltaY = event?.deltaY ?? NaN;

    const nextScale = clamp(
      Number(imageScale) + Number(deltaY) / WHEEL_DELTA_Y_DIVIDER,
      IMAGE_MIN_SCALE,
      IMAGE_MAX_SCALE,
    );

    setImageScale(nextScale);
    debounceUpdateOutput();
  };

  return (
    <Box alignX={FlexAlign.Center} alignY={FlexAlign.Center}>
      <StyledCropCanvas
        ref={cropRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onWheel={handleMouseScroll}
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
