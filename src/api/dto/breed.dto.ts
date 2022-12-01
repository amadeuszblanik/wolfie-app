import { Breed } from "../../types/breed.types";

const breedDto = (data: Breed): Breed => ({
  id: Number(data.id),
  name: data.name,
  group: data.group,
  section: data.section,
  provisional: data.provisional,
  country: data.country,
  url: data.url,
  image: data.image,
  pdf: data.pdf,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export default breedDto;
