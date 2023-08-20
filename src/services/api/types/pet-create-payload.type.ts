import { PetKind } from "./pet-kind.type";
import { PetSex } from "./pet-sex.type";

export interface PetCreatePayloadApi {
  name: string;
  kind: PetKind;
  sex: PetSex;
  breed?: number;
  pureBreed?: boolean;
  birthDate: string;
  microchip?: string;
  neutered?: boolean | null;
  instagram?: string;
}
