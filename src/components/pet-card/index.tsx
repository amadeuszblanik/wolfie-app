import React from "react";
import { BmeAvatar, BmeBox, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { PetsMySingleResponse } from "../../services/api/types/pets/my/response.type";
import { pipeAge, pipeDate } from "../../pipes";
import { Link } from "../../atoms";

interface PetCardProps extends PetsMySingleResponse {
  withLink?: boolean;
}

const StyledPetCardWrapper = styled.div`
  width: 100%;
`;

const Component: React.FC<PetCardProps> = ({ id, name, image, birthDate, microchip, breed, withLink }) => {
  const Card = () => (
    <BmeBox direction="column" width="100%" padding="md" rounded background="backgroundSecondary">
      <BmeBox alignY="bottom" width="100%" margin="no|no|sm">
        <BmeBox padding="no|sm|no|no">
          <BmeAvatar src={image} variant="primary" />
        </BmeBox>
        <BmeText variant="Title1">{name}</BmeText>
      </BmeBox>

      <BmeText>
        <FormattedMessage id="component.pet_card.age" />: {pipeAge(birthDate)}
      </BmeText>
      <BmeText>
        <FormattedMessage id="component.pet_card.birth_date" />: {pipeDate(birthDate)}
      </BmeText>
      <BmeText>
        <FormattedMessage id="component.pet_card.microchip" />: {microchip}
      </BmeText>
      <BmeText>
        <FormattedMessage id="component.pet_card.breed" />: <FormattedMessage id={`breed.${breed?.name ?? "mixed"}`} />
      </BmeText>
    </BmeBox>
  );

  return (
    <StyledPetCardWrapper>
      {withLink ? (
        <Link href={`/app/pet/${id}`}>
          <Card />
        </Link>
      ) : (
        <Card />
      )}
    </StyledPetCardWrapper>
  );
};

export default Component;
