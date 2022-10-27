import breedDto from "./breed.dto";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { PetKind } from "../../types/pet-kind.types";

const myPetsDto = (data: PetSingleResponseModel[]): PetSingleResponseModel[] =>
  data.map((entry) => ({
    id: entry.id,
    name: entry.name,
    kind: entry.kind as PetKind,
    microchip: entry.microchip,
    image: entry.image,
    currentWeight: entry.currentWeight,
    birthDate: new Date(entry.birthDate),
    healthLog: entry.healthLog,
    breed: entry.breed && breedDto(entry.breed),
    createdAt: new Date(entry.createdAt),
    updatedAt: new Date(entry.updatedAt),
  }));

export default myPetsDto;
