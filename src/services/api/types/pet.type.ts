import { BreedApi } from "./breed.type";
import { PetSex } from "./pet-sex.type";
import { PetKind } from "./pet-kind.type";
import { WeightApi } from "./weight.type";

export interface PetApi {
  id: string;
  name: string;
  kind: PetKind;
  sex: PetSex;
  image?: string | null;
  breed?: BreedApi | null;
  birthDate: string;
  microchip: string | null;
  neutered: boolean | null;
  instagram: string | null;
  currentWeight: WeightApi | null;
  healthLog: number;
}
