import { PetKind } from "../../../../../types/pet-kind.type";

export interface PetsAddPayload {
  name: string;
  kind: PetKind;
  breed?: number;
  pureBreed?: boolean;
  birthDate: string;
  microchip?: string;
  neutered?: boolean;
  instagram?: string;
}
