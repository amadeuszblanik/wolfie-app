import { DoggoAvatar, DoggoBox, DoggoPlaceholder, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import React from "react";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";
import { pipeAge, pipeDate } from "../../pipe";
import { ThemePalette } from "styled-components";
import { Breed } from "../../types/breed.types";

interface Props {
  data: {
    name: string;
    microchip: string;
    image?: string;
    birthDate: Date;
    breed?: Breed;
  } | null;
  background?: [ThemePalette, ThemePalette];
  onAvatarEdit?: () => void;
}

const Component: React.FunctionComponent<Props> = ({ data, background, onAvatarEdit }) => (
  <DoggoBox
    width={BoxWidth.Full}
    padding={{ y: SizesEnum.ExtraLarge, x: SizesEnum.ExtraLarge }}
    background={background ?? ["indigo", "blue"]}
    column
  >
    <DoggoBox alignX={FlexAlign.SpaceBetween} padding={{ bottom: SizesEnum.Medium }}>
      <DoggoText variant={DoggoTextVariant.LargeTitle}>{data?.name || <DoggoPlaceholder />}</DoggoText>
      <DoggoAvatar alt="Avatar" size={SizesEnum.ExtraLarge} onEdit={onAvatarEdit}>
        {data?.image}
      </DoggoAvatar>
    </DoggoBox>
    <DoggoBox width={BoxWidth.Full} column>
      <DoggoText>
        <FormattedMessage id="pet.age" />: {data ? pipeAge(data.birthDate) : <DoggoPlaceholder />}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.birthday" />: {data ? pipeDate(data.birthDate) : <DoggoPlaceholder />}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.microchip" />: {data?.microchip || <DoggoPlaceholder />}
      </DoggoText>
      <DoggoText>
        <FormattedMessage id="pet.breed" />:{" "}
        {data ? data.breed?.name ?? <FormattedMessage id="pet.breed.mixed" /> : <DoggoPlaceholder />}
      </DoggoText>
    </DoggoBox>
  </DoggoBox>
);

export default Component;
