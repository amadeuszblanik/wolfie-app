import React, { useEffect, useRef, useState } from "react";
import { BmeAvatar, BmeBox, BmeButton, BmeIcon, BmeModal, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { PetsMySingleResponse } from "../../services/api/types/pets/my/response.type";
import { pipeAge, pipeDate } from "../../pipes";
import { Link } from "../../atoms";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { petsActions, selectPetsAvatarError, selectPetsAvatarStatus } from "../../store/pets.slice";
import { Loader } from "../index";

// @TODO I know that anchor should not be in an anchor, but It's fine for now. Refactor it later.
// @TODO Fix create icon - bme-ui

const FILE_INDEX = 0;

interface PetCardProps extends PetsMySingleResponse {
  withLink?: boolean;
}

const StyledPetCardWrapper = styled.div`
  width: 100%;
`;

const StyledPetInputFile = styled.input`
  display: none;
`;

const Component: React.FC<PetCardProps> = ({ id, name, image, birthDate, microchip, breed, withLink }) => {
  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const storePetsAvatarStatus = useAppSelector(selectPetsAvatarStatus);
  const storePetsAvatarError = useAppSelector(selectPetsAvatarError);

  const [isPhotoUploadError, setIsPhotoUploadError] = useState(false);

  const isPhotoUploading = storePetsAvatarStatus === "pending";

  useEffect(() => {
    switch (storePetsAvatarStatus) {
      case "success":
        dispatch(petsActions.petsMy());
        dispatch(petsActions.resetAvatar());
        break;
      case "error":
        setIsPhotoUploadError(true);
        const refCurrent = ref.current;

        if (refCurrent) {
          refCurrent.value = "";
        }
    }
  }, [storePetsAvatarStatus, dispatch]);

  const handleUpdateAvatar = () => {
    ref.current?.click();
  };

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(FILE_INDEX);

    if (!file) {
      return;
    }

    dispatch(petsActions.avatar({ petId: id, payload: { file } }));
  };

  const Card = () => (
    <BmeBox direction="column" width="100%" padding="md" rounded background="backgroundSecondary">
      <BmeBox alignY="bottom" width="100%" margin="no|no|sm">
        <BmeBox padding="no|sm|no|no">
          <BmeAvatar src={image} variant="primary">
            {!withLink && <BmeAvatar.Action icon="camera-outline" onClick={handleUpdateAvatar} />}
          </BmeAvatar>
        </BmeBox>
        <BmeText variant="Title1">{name}</BmeText>
        <BmeBox alignY="top" height="100%" margin="no|no|auto|auto">
          <Link href={`/app/pet/${id}/edit`}>
            <BmeButton variant="gray5" size="small">
              <BmeIcon name="create-outline" />
            </BmeButton>
          </Link>
        </BmeBox>
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
        <>
          <StyledPetInputFile ref={ref} type="file" accept="image/*" onChange={handleInputFileChange} />
          {isPhotoUploading && <Loader />}
          {isPhotoUploadError && (
            <BmeModal onClose={() => setIsPhotoUploadError(false)}>{storePetsAvatarError}</BmeModal>
          )}
          <Card />
        </>
      )}
    </StyledPetCardWrapper>
  );
};

export default Component;
