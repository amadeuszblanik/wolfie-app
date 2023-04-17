import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BmeSegmentedPicker } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { PetsPetIdWeightGetResponse } from "../../services/api/types/pets/:petId/weight/get/response.type";
import { dateDifference } from "../../utils";
import { DateDifference } from "../../utils/date-difference.util";

export type PetWeightFilter = "w" | "m" | "6m" | "y" | "all";

const MIN_FILTER_TO_DISPLAY = 2;
export const MIN_YEARS = 1;
export const MIN_6MONTHS = 6;
export const MIN_MONTHS = 1;
export const MIN_WEEKS = 1;

interface FilterProps {
  selected: PetWeightFilter;
  entries: PetsPetIdWeightGetResponse | null;
  onChange: (value: PetWeightFilter) => void;
}

const Filter: React.FC<FilterProps> = ({ selected, entries, onChange }) => {
  const dates = useMemo(() => entries?.map(({ date }) => new Date(date)) || [], [entries]);
  const lastEntryDate = useMemo(() => new Date(Math.max(...dates.map((date) => date.getTime()))), [dates]);

  const [filters, setFilters] = useState<PetWeightFilter[]>(["all"]);

  const handleSetFilters = useCallback((dateDiff: DateDifference) => {
    if (dateDiff.weeks <= MIN_WEEKS) {
      setFilters(["w", "m", "6m", "y", "all"]);
    } else if (dateDiff.months <= MIN_MONTHS) {
      setFilters(["m", "6m", "y", "all"]);
    } else if (dateDiff.months <= MIN_6MONTHS) {
      setFilters(["6m", "y", "all"]);
    } else if (dateDiff.years <= MIN_YEARS) {
      setFilters(["y", "all"]);
    } else {
      setFilters(["all"]);
    }
  }, []);

  useEffect(() => {
    const dateDiff = dateDifference(lastEntryDate, new Date(), false);
    handleSetFilters(dateDiff);
  }, [lastEntryDate, handleSetFilters]);

  if (filters.length < MIN_FILTER_TO_DISPLAY) {
    return <></>;
  }

  return (
    <BmeSegmentedPicker value={selected}>
      {filters.map((filter) => (
        <BmeSegmentedPicker.Item key={filter} tag={filter} onClick={() => onChange(filter)}>
          <FormattedMessage id={`weight.filters.${filter}`} />
        </BmeSegmentedPicker.Item>
      ))}
    </BmeSegmentedPicker>
  );
};

export default Filter;
