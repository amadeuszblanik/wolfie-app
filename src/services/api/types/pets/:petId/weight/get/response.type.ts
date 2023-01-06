export interface PetsPetIdWeightSingleGetResponse {
  id: string;
  raw: number;
  formatted: string;
  rawGram: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type PetsPetIdWeightGetResponse = PetsPetIdWeightSingleGetResponse[];
