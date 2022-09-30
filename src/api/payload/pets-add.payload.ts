import { PetKind } from "../../types/pet-kind.types";

export interface PetsAddPayload {
  name: string;
  kind: PetKind;
  breed?: number;
  microchip: string;
  birthDate: Date;
}
