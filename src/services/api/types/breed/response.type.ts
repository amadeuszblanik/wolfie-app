export interface BreedSingleResponse {
  id: number;
  name: string;
  group: string;
  section: string;
  provisional: string;
  country: string;
  url: string;
  image: string;
  pdf: string;
}

export type BreedResponse = BreedSingleResponse[];
