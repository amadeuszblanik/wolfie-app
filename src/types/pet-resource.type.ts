import { PetsMySingleResponse } from "../services/api/types/pets/my/response.type";
import { PetsPetIdWeightGetResponse } from "../services/api/types/pets/:petId/weight/get/response.type";

export interface PetResource extends PetsMySingleResponse {
  weights?: PetsPetIdWeightGetResponse;
}
