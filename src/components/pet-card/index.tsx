import React from "react";
import { BmeAvatar, BmeBox, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import { PetsMySingleResponse } from "../../services/api/types/pets/my/response.type";
import { pipeAge, pipeDate } from "../../pipes";

type PetCardProps = PetsMySingleResponse;
const Component: React.FC<PetCardProps> = ({ name, image, birthDate, microchip, breed }) => (
  <BmeBox direction="column" width="100%" padding="sm|md" rounded background="backgroundSecondary">
    <BmeBox alignY="bottom" width="100%" margin="no|no|sm">
      <BmeBox padding="no|sm|no|no">
        <BmeAvatar src={image} variant="primary" />
      </BmeBox>
      <BmeText variant="Title1">{name}</BmeText>
    </BmeBox>

    <BmeText>Age: {pipeAge(birthDate)}</BmeText>
    <BmeText>Birthdate: {pipeDate(birthDate)}</BmeText>
    <BmeText>Microchip: {microchip}</BmeText>
    <BmeText>
      Breed: <FormattedMessage id={`breed.${breed?.name ?? "mixed"}`} />
    </BmeText>
  </BmeBox>
);

export default Component;
