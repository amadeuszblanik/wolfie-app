import React from "react";
import { DoggoBox, DoggoButton, DoggoIcon, DoggoText } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FlexAlign } from "../../ui-components/box";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";

interface Props {
  title?: string;
  message?: string;
}

const Component: React.FunctionComponent<Props> = ({ title, message }) => (
  <DoggoBox alignX={FlexAlign.Center} column>
    <DoggoBox padding={{ bottom: SizesEnum.Medium }}>
      <DoggoBox alignX={FlexAlign.Center}>
        <DoggoIcon icon="checkmark" size={SizesEnum.ExtraLarge2} />
      </DoggoBox>
    </DoggoBox>
    <DoggoBox>
      <DoggoText variant={DoggoTextVariant.Title1} leading>
        {title ?? <FormattedMessage id="common.success_header" />}
      </DoggoText>
    </DoggoBox>
    <DoggoText variant={DoggoTextVariant.Headline} leading>
      {message ?? <FormattedMessage id="common.success_message" />}
    </DoggoText>
  </DoggoBox>
);

export default Component;
