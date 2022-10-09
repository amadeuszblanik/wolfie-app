import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";

const getHealthLogSingleDto = (data: HealthLogResponseModel): HealthLogResponseModel => ({
  id: data.id,
  kind: data.kind,
  date: new Date(data.date),
  medicines: data.medicines,
  additionalMedicines: data.additionalMedicines,
  veterinary: data.veterinary,
  diagnosis: data.diagnosis,
  nextVisit: data.nextVisit ? new Date(data.nextVisit) : null,
  description: data.description,
  addedBy: data.addedBy,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export default getHealthLogSingleDto;
