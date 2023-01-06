export interface BreedSingleResponse {
  id: number;
  name?: string | null;
  group?: string | null;
  section?: string | null;
  provisional?: string | null;
  country?: string | null;
  url?: string | null;
  image?: string | null;
  pdf?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BreedResponse = BreedSingleResponse[];
