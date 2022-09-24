export interface Breed {
  id: number;
  name: string;
  group: string;
  section?: string;
  provisional?: string;
  country?: string;
  url?: string;
  image?: string;
  pdf?: string;
  createdAt: Date;
  updatedAt: Date;
}
