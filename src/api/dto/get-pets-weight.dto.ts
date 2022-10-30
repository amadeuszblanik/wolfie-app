import getPetsWeightSingleDto from "./get-pets-weight-single.dto";
import { WeightValueResponseModel } from "../response-model/weight-value.response-model";

const getPetsWeightDto = (data: WeightValueResponseModel[]): WeightValueResponseModel[] =>
  data.map(getPetsWeightSingleDto);

export default getPetsWeightDto;
