import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import getHealthLogSingleDto from "./get-health-log-single.dto";

const getHealthLogDto = (data: HealthLogResponseModel[]): HealthLogResponseModel[] => data.map(getHealthLogSingleDto);

export default getHealthLogDto;
