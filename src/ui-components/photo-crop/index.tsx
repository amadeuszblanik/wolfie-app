import type React from "react";
import { SizesEnum } from "../../settings/sizes";
import Box, { FlexAlign } from "../box";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { firstElement } from "bme-utils";

const CANVAS_MOUSE_RADIUS = 5;
const CANVAS_START_POSITIONS_MULTIPLIER_1 = 0.25;
const CANVAS_START_POSITIONS_MULTIPLIER_2 = 0.75;
const CANVAS_CIRCLE = 2;
const CANVAS_CIRCLE_START_ANGLE = 0;
const CANVAS_OUTPUT_DX = 0;
const CANVAS_OUTPUT_DY = 0;
const CANVAS_CLEAR_VALUE = 0;

type PointsType = "topRight" | "bottomRight" | "bottomLeft" | "topLeft";

interface Points {
  x: number;
  y: number;
  cursor?: string;
  type?: PointsType;
}

interface Props {
  src: string;
  onCrop: (data: string) => void;
}

interface ImageOnLoadEvent extends Event {
  path: HTMLImageElement[];
}

const StyledCropCanvas = styled.canvas`
  width: 100%;
  height: 512px;
`;

const StyledOutputCanvas = styled.canvas`
  width: 100%;
  height: 512px;
  background-color: #000;
`;

const Component = ({ src, onCrop }: Props) => {
  const cropRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState(new Image());
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [cropPoint, setCropPoint] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [moveActive, setMoveActive] = useState<PointsType>();
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const updateOutput = useCallback(() => {
    const canvasCrop = cropRef?.current;
    const canvasOutput = outputRef?.current;

    if (!canvasCrop || !canvasOutput) {
      throw new Error("Canvas is not defined");
    }

    const width = Math.abs(cropPoint.right - cropPoint.left);
    const height = Math.abs(cropPoint.bottom - cropPoint.top);

    canvasOutput.width = width;
    canvasOutput.height = height;

    canvasOutput.style.width = `${width}px`;
    canvasOutput.style.height = `${height}px`;

    const ctxCrop = canvasCrop.getContext("2d");
    const ctxOutput = canvasOutput.getContext("2d");

    if (!ctxCrop || !ctxOutput) {
      throw new Error("Context is not defined");
    }

    ctxOutput.drawImage(
      image,
      cropPoint.left,
      cropPoint.top,
      width,
      height,
      CANVAS_OUTPUT_DX,
      CANVAS_OUTPUT_DY,
      width,
      height,
    );

    const jpg = canvasOutput.toDataURL("image/jpeg");
    onCrop(jpg);
  }, [cropRef, outputRef, image, cropPoint, onCrop]);

  useEffect(() => {
    const newImage = new Image();
    newImage.src = src;
    newImage.crossOrigin = "Anonymous";
    setImage(newImage);

    newImage.onload = (event) => {
      console.log("Image loaded", event);

      const path = (event.target as HTMLImageElement) || firstElement([...(event as ImageOnLoadEvent).path]);

      console.log("Image loaded", path, event);

      if (!path) {
        throw new Error("Image is not defined");
      }

      setCanvasWidth(path.width);
      setCanvasHeight(path.height);
    };
  }, [src]);

  // Draw top right crop point
  useEffect(() => {
    if (!ctx) {
      return;
    }

    ctx.clearRect(
      CANVAS_CLEAR_VALUE,
      CANVAS_CLEAR_VALUE,
      cropRef.current?.width || CANVAS_CLEAR_VALUE,
      cropRef.current?.height || CANVAS_CLEAR_VALUE,
    );

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(cropPoint.left, cropPoint.top);
    ctx.lineTo(cropPoint.right, cropPoint.top);
    ctx.lineTo(cropPoint.right, cropPoint.bottom);
    ctx.lineTo(cropPoint.left, cropPoint.bottom);
    ctx.lineTo(cropPoint.left, cropPoint.top);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(cropPoint.right, cropPoint.top, CANVAS_MOUSE_RADIUS, CANVAS_CIRCLE_START_ANGLE, CANVAS_CIRCLE * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cropPoint.right, cropPoint.bottom, CANVAS_MOUSE_RADIUS, CANVAS_CIRCLE_START_ANGLE, CANVAS_CIRCLE * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cropPoint.left, cropPoint.bottom, CANVAS_MOUSE_RADIUS, CANVAS_CIRCLE_START_ANGLE, CANVAS_CIRCLE * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cropPoint.left, cropPoint.top, CANVAS_MOUSE_RADIUS, CANVAS_CIRCLE_START_ANGLE, CANVAS_CIRCLE * Math.PI);
    ctx.stroke();

    // updateOutput(); // @TODO: optimize or even consider this
  }, [cropPoint, ctx]);

  useEffect(() => {
    const canvas = cropRef?.current;

    if (!canvas) {
      throw new Error("Canvas is not defined");
    }

    const ctxRef = canvas.getContext("2d");
    setCtx(ctxRef);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.backgroundImage = `url(${src})`;

    setCropPoint({
      top: canvasHeight * CANVAS_START_POSITIONS_MULTIPLIER_1,
      right: canvasWidth * CANVAS_START_POSITIONS_MULTIPLIER_2,
      bottom: canvasHeight * CANVAS_START_POSITIONS_MULTIPLIER_2,
      left: canvasWidth * CANVAS_START_POSITIONS_MULTIPLIER_1,
    });
  }, [cropRef, image, src, canvasWidth, canvasHeight]);

  const pointInCircle = (x: number, y: number, cx: number, cy: number, radius: number) => {
    const distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distanceSquared <= radius * radius;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasRef = cropRef?.current;

    if (!ctx || !canvasRef) {
      return;
    }

    const mouseX = event.pageX - canvasRef.offsetLeft;
    const mouseY = event.pageY - canvasRef.offsetTop;

    const cropPoints: Points[] = [
      { x: cropPoint.right, y: cropPoint.top, type: "topRight" },
      { x: cropPoint.right, y: cropPoint.bottom, type: "bottomRight" },
      { x: cropPoint.left, y: cropPoint.bottom, type: "bottomLeft" },
      { x: cropPoint.left, y: cropPoint.top, type: "topLeft" },
    ];

    const selectedCropPoint = cropPoints.find((point) =>
      pointInCircle(mouseX, mouseY, point.x, point.y, CANVAS_MOUSE_RADIUS),
    );

    setMoveActive(selectedCropPoint?.type ?? undefined);
  };

  const handleMouseUp = () => {
    setMoveActive(undefined);

    updateOutput();
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvasRef = cropRef?.current;

      if (!ctx || !canvasRef) {
        return;
      }

      const mouseX = event.pageX - canvasRef.offsetLeft;
      const mouseY = event.pageY - canvasRef.offsetTop;

      const cropPoints: Points[] = [
        { x: cropPoint.right, y: cropPoint.top, cursor: "nesw-resize" },
        { x: cropPoint.right, y: cropPoint.bottom, cursor: "nwse-resize" },
        { x: cropPoint.left, y: cropPoint.bottom, cursor: "nesw-resize" },
        { x: cropPoint.left, y: cropPoint.top, cursor: "nwse-resize" },
      ];

      const selectedCropPoint = cropPoints.find((point) =>
        pointInCircle(mouseX, mouseY, point.x, point.y, CANVAS_MOUSE_RADIUS),
      );

      if (selectedCropPoint) {
        canvasRef.style.cursor = selectedCropPoint.cursor || "grab";
      } else {
        canvasRef.style.cursor = "default";
      }

      if (moveActive) {
        switch (moveActive) {
          case "topRight":
            setCropPoint({
              ...cropPoint,
              top: mouseY,
              right: mouseX,
            });
            break;
          case "bottomRight":
            setCropPoint({
              ...cropPoint,
              bottom: mouseY,
              right: mouseX,
            });
            break;
          case "bottomLeft":
            setCropPoint({
              ...cropPoint,
              bottom: mouseY,
              left: mouseX,
            });
            break;
          case "topLeft":
            setCropPoint({
              ...cropPoint,
              top: mouseY,
              left: mouseX,
            });
            break;
        }
      }
    },
    [cropPoint, cropRef, moveActive, ctx],
  );

  return (
    <Box alignX={FlexAlign.Center} alignY={FlexAlign.Center}>
      <StyledCropCanvas
        ref={cropRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <StyledOutputCanvas ref={outputRef} />
    </Box>
  );
};

Component.defaultProps = {
  size: SizesEnum.Medium,
};

export default Component;
