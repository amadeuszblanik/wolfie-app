import { PetKind } from "../../../../../types/pet-kind.type";

export interface PetsAddPayload {
  name: string;
  kind: PetKind;
  breed: number;
  microchip: string;
  birthDate: Date;
}
