import { useIntl } from "react-intl";
import queriesBase from "./base";
import { QueryKeys } from "../keys";
import ApiClientPet from "../client/pet";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";

const useQueries = (petId: string) => {
  const intl = useIntl();
  const apiClient = new ApiClientPet(intl.locale);

  return queriesBase.get<HealthLogResponseModel[]>(QueryKeys.Pet.healthLog(petId), () => apiClient.getHealtlog(petId));
};

export default useQueries;
