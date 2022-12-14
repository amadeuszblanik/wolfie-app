import React from "react";
import { FormattedMessage } from "react-intl";
import { DoggoBox, DoggoButton, DoggoIcon, DoggoText } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FlexAlign } from "../../ui-components/box";
import { DoggoTextVariant } from "../../ui-components/text";

interface Props {
  title?: string;
  message?: string;
  tryAgain?: string;
  onTryAgain?: () => void;
}

const Component: React.FunctionComponent<Props> = ({ title, message, tryAgain, onTryAgain }) => (
  <DoggoBox alignX={FlexAlign.Center} column>
    <DoggoBox padding={{ bottom: SizesEnum.Medium }}>
      <DoggoBox alignX={FlexAlign.Center}>
        <DoggoIcon icon="warning" size={SizesEnum.ExtraLarge2} />
      </DoggoBox>
    </DoggoBox>
    <DoggoBox>
      <DoggoText variant={DoggoTextVariant.Title1} leading>
        {title ?? <FormattedMessage id="common.error_header" />}
      </DoggoText>
    </DoggoBox>
    <DoggoText variant={DoggoTextVariant.Headline} leading>
      {message ?? <FormattedMessage id="common.error_message" />}
    </DoggoText>
    {onTryAgain && (
      <DoggoBox padding={{ top: SizesEnum.Large }}>
        <DoggoButton variant="blue" onClick={onTryAgain}>
          {tryAgain || <FormattedMessage id="common.try_again" />}
        </DoggoButton>
      </DoggoBox>
    )}
  </DoggoBox>
);

export default Component;
