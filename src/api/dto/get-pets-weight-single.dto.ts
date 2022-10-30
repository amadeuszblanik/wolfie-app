import { WeightValueResponseModel } from "../response-model/weight-value.response-model";

const getPetsWeightSingleDto = (data: WeightValueResponseModel): WeightValueResponseModel => ({
  id: data.id,
  raw: Number(data.raw),
  formatted: String(data.formatted),
  rawGram: Number(data.rawGram),
  date: new Date(data.date),
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export default getPetsWeightSingleDto;
