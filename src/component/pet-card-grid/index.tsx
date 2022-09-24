import { SizesEnum } from "../../settings/sizes";
import React from "react";
import { PetSingleResponseModel } from "../../api/response-model/pet-single.response-model";
import styled from "styled-components";
import PetCard from "../pet-card";
import { sizeMixin } from "../../ui-components/mixins";

type Props = {
  pets: PetSingleResponseModel[];
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${sizeMixin(SizesEnum.Large)};
  margin: 0 auto;

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Component: React.FunctionComponent<Props> = ({ pets }) => {
  return (
    <StyledGrid>
      {pets.map((pet) => (
        <PetCard {...pet} key={pet.id} />
      ))}
    </StyledGrid>
  );
};

export default Component;
