import { WeightValueResponseModel } from "../response-model/weight-value.response-model";

const getPetsWeightDto = (data: WeightValueResponseModel[]): WeightValueResponseModel[] =>
  data.map((entry) => ({
    id: entry.id,
    raw: Number(entry.raw),
    formatted: String(entry.formatted),
    rawGram: Number(entry.rawGram),
    date: new Date(entry.date),
    createdAt: new Date(entry.createdAt),
    updatedAt: new Date(entry.updatedAt),
  }));

export default getPetsWeightDto;
