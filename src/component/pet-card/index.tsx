import { DoggoAvatar, DoggoBox, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import React from "react";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";
import { pipeAge, pipeDate } from "../../pipe";
import { ThemePalette } from "styled-components";
import { Breed } from "../../types/breed.types";

interface Props {
  name: string;
  microchip: string;
  image?: string;
  birthDate: Date;
  breed?: Breed;
  background?: [ThemePalette, ThemePalette];
  onAvatarEdit?: () => void;
}

// const availableBackgrounds: ThemePalette[][] = [
//   ["indigo", "blue"],
//   ["red", "indigo"],
//   ["red", "purple"],
//   ["indigo", "purple"],
//   ["blue", "cyan"],
// ];

const Component: React.FunctionComponent<Props> = ({
  name,
  birthDate,
  microchip,
  breed,
  image,
  background,
  onAvatarEdit,
}) => (
  <DoggoBox
    width={BoxWidth.Full}
    padding={{ y: SizesEnum.ExtraLarge, x: SizesEnum.ExtraLarge }}
    background={background ?? ["indigo", "blue"]}
    column
  >
    <DoggoBox alignX={FlexAlign.SpaceBetween} padding={{ bottom: SizesEnum.Medium }}>
      <DoggoText variant={DoggoTextVariant.LargeTitle}>{name}</DoggoText>
      <DoggoAvatar alt="Avatar" size={SizesEnum.ExtraLarge} onEdit={onAvatarEdit}>
        {image}
      </DoggoAvatar>
    </DoggoBox>
    <DoggoBox width={BoxWidth.Full} column>
      <DoggoText>
        <FormattedMessage id="pet.age" />: {pipeAge(birthDate)}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.birthday" />: {pipeDate(birthDate)}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.microchip" />: {microchip}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.breed" />: {breed?.name ?? <FormattedMessage id="pet.breed.mixed" />}
      </DoggoText>
    </DoggoBox>
  </DoggoBox>
);

export default Component;
