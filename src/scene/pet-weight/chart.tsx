import React from "react";
import { BmeLineChart } from "bme-ui";
import { PetsPetIdWeightGetResponse } from "../../services/api/types/pets/:petId/weight/get/response.type";

const ENTRIES_TO_DISPLAY_CHART = 3;

interface ChartProps {
  entries: PetsPetIdWeightGetResponse | null;
  width?: number;
}

const Chart: React.FC<ChartProps> = ({ entries, width }) => {
  if (!entries || entries.length < ENTRIES_TO_DISPLAY_CHART) {
    return <></>;
  }

  return (
    <BmeLineChart
      width={width}
      data={entries.map(({ raw, date }) => ({
        y: raw,
        x: new Date(date),
      }))}
    />
  );
};

export default Chart;
