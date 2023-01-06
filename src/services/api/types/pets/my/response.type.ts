import { PetKind } from "../../../../../types/pet-kind.type";
import { PetsPetIdWeightGetResponse } from "../:petId/weight/get/response.type";
import { BreedSingleResponse } from "../../breed/response.type";

export interface PetsMySingleResponse {
  id: string;
  name: string;
  kind: PetKind;
  microchip: string;
  image: string;
  currentWeight?: PetsPetIdWeightGetResponse;
  birthDate: string;
  healthLog: number;
  vaccinations: number;
  medicines: number;
  breed?: BreedSingleResponse | null;
  createdAt: string;
  updatedAt: string;
}

export type PetsMyResponse = PetsMySingleResponse[];
