import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { DoggoBox, DoggoContainer, DoggoText } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FlexAlign } from "../../ui-components/box";
import { DoggoTextVariant } from "../../ui-components/text";

const Component: React.FunctionComponent = () => (
  <footer>
    <DoggoContainer>
      <DoggoBox alignX={FlexAlign.Center} column padding={{ top: SizesEnum.Large, bottom: SizesEnum.ExtraLarge2 }}>
        <DoggoText variant={DoggoTextVariant.Caption1}>
          <FormattedMessage id="component.footer.header" values={{ year: new Date().getFullYear() }} />
        </DoggoText>
        <DoggoText variant={DoggoTextVariant.Caption1}>
          <FormattedMessage id="component.footer.author" /> <a href="https://blanik.me">Blanik.me</a>
        </DoggoText>
        <DoggoText variant={DoggoTextVariant.Caption2}>
          <Link href="/privacy-policy">
            <a>
              <FormattedMessage id="component.footer.link_privacy_policy" />
            </a>
          </Link>
        </DoggoText>
      </DoggoBox>
    </DoggoContainer>
  </footer>
);
export default Component;
