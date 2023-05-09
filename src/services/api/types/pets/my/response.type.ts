import { PetKind } from "../../../../../types/pet-kind.type";
import { ResultsList } from "../../results-list.type";
import { BreedSingleResponse } from "../../breed/response.type";

export interface PetsBreed extends BreedSingleResponse {
  isPure: boolean;
}

export interface PetsMySingleResponse {
  id: string;
  name: string;
  kind: PetKind;
  breed: PetsBreed | null;
  birthDate: string;
  microchip: string | null;
  neutered: boolean | null;
  instagram: string | null;
  image?: string;
}

export type PetsMyResponse = ResultsList<PetsMySingleResponse>;
