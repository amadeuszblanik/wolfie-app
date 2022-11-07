import { useIntl } from "react-intl";
import queriesBase from "./base";
import { HealthLogResponseModel } from "../response-model/health-log-single.response-model";
import { HealthLogAddPayload } from "../payload/health-log-add.payload";
import { QueryKeys } from "../keys";
import ApiClientPet from "../client/pet";

const useQueries = (petId: string) => {
  const intl = useIntl();
  const apiClient = new ApiClientPet(intl.locale);

  return queriesBase.post<HealthLogResponseModel, HealthLogAddPayload>(
    (payload: HealthLogAddPayload) => apiClient.postHealthLog(petId, payload),
    [QueryKeys.Pet.healthLog(petId), QueryKeys.Pet.single(petId)],
  );
};

export default useQueries;
