import { useIntl } from "react-intl";
import queriesBase from "./base";
import { QueryKeys } from "../keys";
import ApiClientPet from "../client/pet";
import { CommonMessageResponseModel } from "../response-model/common-message.response-model";

const useQueries = (petId: string, healthLogId: string) => {
  const intl = useIntl();
  const apiClient = new ApiClientPet(intl.locale);

  return queriesBase.delete<CommonMessageResponseModel, Parameters<typeof apiClient.deleteHealthLog>>(
    () => apiClient.deleteHealthLog(petId, healthLogId),
    [QueryKeys.Pet.healthLogSingle(petId, healthLogId), QueryKeys.Pet.healthLog(petId), QueryKeys.Pet.single(petId)],
  );
};

export default useQueries;
