import styled from "styled-components";
import type React from "react";
import { useScreenSize } from "../../hooks";
import Sizes, { SizesEnum } from "../../settings/sizes";
import { getIndexes } from "../../utils";
import { pipeDate } from "../../pipe";

const CHART_RATIO = 1.799;

interface LineChartItem {
  x: number | Date;
  y: number;
  labelX?: string;
  labelY?: string;
}

interface Props {
  data: LineChartItem[];
  width?: number;
}

const StyledChartWrapper = styled.svg`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.background};
  border: ${({ theme }) => theme.palette.gray5} 1px solid;
`;

const StyledChartPoint = styled.circle`
  fill: ${({ theme }) => theme.palette.background};
  stroke: ${({ theme }) => theme.palette.blue};
  stroke-width: 2;
`;

const StyledChartLine = styled.line`
  stroke: ${({ theme }) => theme.palette.blue};
  stroke-width: 2;
`;

const StyledChartLabelY = styled.text`
  font: italic 13px sans-serif;
  fill: ${({ theme }) => theme.palette.gray2};
`;

const StyledChartLabelX = styled.text`
  font: italic 13px sans-serif;
  fill: ${({ theme }) => theme.palette.gray2};
`;

const StyledChartLabelLine = styled.line`
  stroke: ${({ theme }) => theme.palette.gray5};
  stroke-width: 2;
  stroke-dasharray: 5, 5;
`;

const BOTH_PADDING_MULTIPLIER = 2;
const X_Y_2_INDEX_DIFFERENCE = 1;

const LABELS_Y_TO_SHOW = 5;
const LABELS_X_TO_SHOW = 5;

const NO_REMAINDER_VALUE = 0;

const Component = ({ data, width }: Props) => {
  const dataIndexes = getIndexes(data);
  const { width: screenWidth } = useScreenSize();
  const labelYWidth = 50;
  const labelXHeight = 20;

  width = width ?? screenWidth;

  const dataChart = data.map((item) => ({
    ...item,
    x: Number(item.y),
    labelX: item.labelX || item.x instanceof Date ? pipeDate(item.x as Date) : String(item.x),
    labelY: item.labelY ?? String(item.y),
  }));

  const minXValue = Math.min(...dataChart.map((item) => item.x));
  const maxXValue = Math.max(...dataChart.map((item) => item.x));
  const rangeX = maxXValue - minXValue;

  const minYValue = Math.min(...dataChart.map((item) => item.y));
  const maxYValue = Math.max(...dataChart.map((item) => item.y));
  const rangeY = maxYValue - minYValue;

  const height = width / CHART_RATIO;
  const paddingX = Sizes[SizesEnum.ExtraLarge];
  const paddingY = Sizes[SizesEnum.ExtraLarge];
  const availableWidth = width - paddingX * BOTH_PADDING_MULTIPLIER - labelYWidth;
  const availableHeight = height - paddingY * BOTH_PADDING_MULTIPLIER - labelXHeight;

  const labelsY = dataChart.filter(
    (_, index) => index % Math.ceil(data.length / LABELS_Y_TO_SHOW) === NO_REMAINDER_VALUE,
  );
  const labelsX = dataChart.filter(
    (_, index) => index % Math.ceil(data.length / LABELS_X_TO_SHOW) === NO_REMAINDER_VALUE,
  );
  const labelsXIndexes = getIndexes(labelsX);

  const calculatePointX = (index: number) => {
    return (index / dataIndexes) * availableWidth + paddingX;
  };

  const calculatePointY = (index: number) => {
    const value = dataChart[index].y;

    return availableHeight - ((value - minYValue) / rangeY) * availableHeight + paddingY;
  };

  const calculateLineX1 = (index: number) => {
    return calculatePointX(index);
  };

  const calculateLineX2 = (index: number) => {
    return calculatePointX(index + X_Y_2_INDEX_DIFFERENCE);
  };

  const calculateLineY1 = (index: number) => {
    return calculatePointY(index);
  };

  const calculateLineY2 = (index: number) => {
    return calculatePointY(index + X_Y_2_INDEX_DIFFERENCE);
  };

  const calculateLabelYX = () => {
    return availableWidth + labelYWidth;
  };

  const calculateLabelYY = (index: number) => {
    const value = labelsY[index].y;

    return availableHeight - ((value - minYValue) / rangeY) * availableHeight + paddingY;
  };

  const calculateLabelLineYY = () => {
    return availableWidth + paddingX;
  };

  const calculateLabelXX = (index: number) => {
    return (index / labelsXIndexes) * availableWidth + paddingX;
  };

  const calculateLabelXY = () => {
    return availableHeight + paddingY + labelXHeight;
  };

  const calculateLabelLineXY = () => {
    return availableHeight + paddingY;
  };

  return (
    <StyledChartWrapper viewBox={`0 0 ${width} ${height}`}>
      <>
        {labelsY.map((label, index) => (
          <>
            <StyledChartLabelY key={index} x={calculateLabelYX()} y={calculateLabelYY(index)}>
              {label.labelY}
            </StyledChartLabelY>
            <StyledChartLabelLine
              key={index}
              x1={0}
              x2={calculateLabelLineYY()}
              y1={calculateLabelYY(index)}
              y2={calculateLabelYY(index)}
            />
          </>
        ))}
        {labelsX.map((label, index) => (
          <>
            <StyledChartLabelX key={index} x={calculateLabelXX(index)} y={calculateLabelXY()}>
              {label.labelX}
            </StyledChartLabelX>
            <StyledChartLabelLine
              key={index}
              x1={calculateLabelXX(index)}
              x2={calculateLabelXX(index)}
              y1={0}
              y2={calculateLabelLineXY()}
            />
          </>
        ))}
        {dataChart.map((item, index) => (
          <>
            {index < dataIndexes && (
              <StyledChartLine
                key={index}
                x1={calculateLineX1(index)}
                x2={calculateLineX2(index)}
                y1={calculateLineY1(index)}
                y2={calculateLineY2(index)}
              />
            )}
            <StyledChartPoint key={index} cx={calculatePointX(index)} cy={calculatePointY(index)} r={5} />
          </>
        ))}
      </>
    </StyledChartWrapper>
  );
};

export default Component;
