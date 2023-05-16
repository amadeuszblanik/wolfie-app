import { WeightUnits } from "../../../types/weight-units.type";

export interface WeightApi {
  id: string;
  weight: {
    formatted: string;
    value: number;
    unit: WeightUnits;
  };
  date: Date;
}
