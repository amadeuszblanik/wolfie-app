import { BreedApi } from "./breed.type";
import { PetSex } from "./pet-sex.type";
import { PetKind } from "./pet-kind.type";

export interface PetApi {
  id: string;
  name: string;
  kind: PetKind;
  sex: PetSex;
  image?: string | null;
  breed: BreedApi;
  birthDate: string;
  microchip: string | null;
  neutered: boolean | null;
  instagram: string | null;
}
