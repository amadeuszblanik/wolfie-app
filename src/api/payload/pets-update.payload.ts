import { PetKind } from "../../types/pet-kind.types";

export interface PetsUpdatePayload {
  name?: string;
  kind?: PetKind;
  breed?: number;
  microchip?: string;
  birthDate?: Date;
}
