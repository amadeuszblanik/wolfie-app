import React from "react";
import { BmeLineChart } from "bme-ui";
import { WeightApi } from "../../services/api/types/weight.type";

const ENTRIES_TO_DISPLAY_CHART = 3;

interface ChartProps {
  entries: WeightApi[] | null;
  width?: number;
}

const Chart: React.FC<ChartProps> = ({ entries, width }) => {
  if (!entries || entries.length < ENTRIES_TO_DISPLAY_CHART) {
    return <></>;
  }

  return (
    <BmeLineChart
      width={width}
      data={entries.map(({ weight: { value }, date }) => ({
        y: value,
        x: new Date(date),
      }))}
    />
  );
};

export default Chart;
