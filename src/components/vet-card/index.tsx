import React from "react";
import { BmeBox, BmeButton, BmeIcon, BmeText } from "bme-ui";
import styled from "styled-components";
import { Link } from "../../atoms";
import { VetApi } from "../../services/api/types/vet.type";

// @TODO I know that anchor should not be in an anchor, but It's fine for now. Refactor it later.

const StyledPetCardWrapper = styled.div`
  width: 100%;
`;

const Component: React.FC<VetApi> = ({ id, name, address, postCode, city, country, phoneNumber, email }) => (
  <StyledPetCardWrapper>
    <BmeBox direction="column" width="100%" padding="md" rounded background="backgroundSecondary">
      <BmeBox alignY="bottom" width="100%" margin="no|no|sm">
        <BmeText variant="Title1">{name}</BmeText>
        <BmeBox alignY="top" height="100%" margin="no|no|auto|auto">
          <Link href={`/app/vet/${id}/edit`}>
            <BmeButton variant="gray5" size="small">
              <BmeIcon name="create-outline" />
            </BmeButton>
          </Link>
        </BmeBox>
      </BmeBox>

      <BmeText>{address}</BmeText>
      <BmeText>
        {postCode} {city}
      </BmeText>
      <BmeText>{country}</BmeText>
      <BmeText>{phoneNumber}</BmeText>
      <BmeText>{email}</BmeText>
    </BmeBox>
  </StyledPetCardWrapper>
);

export default Component;
