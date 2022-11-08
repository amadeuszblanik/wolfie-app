import breedDto from "./breed.dto";
import { PetSingleResponseModel } from "../response-model/pet-single.response-model";
import { PetKind } from "../../types/pet-kind.types";

const getPetsDto = (data: PetSingleResponseModel): PetSingleResponseModel => ({
  id: data.id,
  name: data.name,
  kind: data.kind as PetKind,
  microchip: data.microchip,
  image: data.image,
  currentWeight: data.currentWeight,
  birthDate: new Date(data.birthDate),
  healthLog: data.healthLog,
  breed: data.breed && breedDto(data.breed),
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export default getPetsDto;
