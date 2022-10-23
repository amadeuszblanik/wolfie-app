import getHealthLogSingleDto from "./get-health-log-single.dto";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";

const getHealthLogDto = (data: HealthLogResponseModel[]): HealthLogResponseModel[] => data.map(getHealthLogSingleDto);

export default getHealthLogDto;
