import React from "react";
import { DoggoBox, DoggoButton, DoggoIcon, DoggoText } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FlexAlign } from "../../ui-components/box";
import { DoggoTextVariant } from "../../ui-components/text";
import { FormattedMessage } from "react-intl";

interface Props {
  title: string;
  message: string;
  onTryAgain?: () => void;
}

const Component: React.FunctionComponent<Props> = ({ title, message, onTryAgain }) => {
  return (
    <DoggoBox alignX={FlexAlign.Center} column>
      <DoggoBox padding={{ bottom: SizesEnum.Medium }}>
        <DoggoBox alignX={FlexAlign.Center}>
          <DoggoIcon icon="warning-outline" size={SizesEnum.ExtraLarge2} />
        </DoggoBox>
      </DoggoBox>
      <DoggoBox>
        <DoggoText variant={DoggoTextVariant.Title1} leading>
          {title}
        </DoggoText>
      </DoggoBox>
      <DoggoText variant={DoggoTextVariant.Headline} leading>
        {message}
      </DoggoText>
      {onTryAgain && (
        <DoggoBox padding={{ top: SizesEnum.Large }}>
          <DoggoButton variant="blue" onClick={onTryAgain}>
            <FormattedMessage id="common.try_again" />
          </DoggoButton>
        </DoggoBox>
      )}
    </DoggoBox>
  );
};

export default Component;
