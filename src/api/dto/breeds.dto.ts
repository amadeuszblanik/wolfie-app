import { Breed } from "../../types/breed.types";
import breedDto from "./breed.dto";

const breedsDto = (data: Breed[]): Breed[] => data.map(breedDto);

export default breedsDto;
