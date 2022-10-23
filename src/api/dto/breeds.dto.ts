import breedDto from "./breed.dto";
import { Breed } from "../../types/breed.types";

const breedsDto = (data: Breed[]): Breed[] => data.map(breedDto);

export default breedsDto;
