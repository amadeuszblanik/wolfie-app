import { WeightValueResponseModel } from "./weight-value.response-model";
import { PetKind } from "../../types/pet-kind.types";
import { Breed } from "../../types/breed.types";

export interface PetSingleResponseModel {
  id: string;
  name: string;
  kind: PetKind;
  microchip: string;
  image: string;
  currentWeight?: WeightValueResponseModel;
  birthDate: Date;
  vaccinations: number;
  medicines: number;
  breed?: Breed;
  createdAt: Date;
  updatedAt: Date;
}
