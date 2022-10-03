import React from "react";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoText } from "../../ui-components";
import { SizesEnum } from "../../settings/sizes";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { DoggoTextVariant } from "../../ui-components/text";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Auth: React.FunctionComponent<Props> = ({ children, title, description }) => {
  const router = useRouter();

  return (
    <DoggoBox padding={{ y: SizesEnum.Large }}>
      <DoggoContainer fullWidth>
        <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Large }}>
          <DoggoButton onClick={() => router.push("/")}>
            <FormattedMessage id="common.back" />
          </DoggoButton>
        </DoggoBox>

        <DoggoBox
          column
          alignX={FlexAlign.Center}
          width={BoxWidth.Full}
          padding={{ x: SizesEnum.ExtraLarge, y: SizesEnum.Large }}
          background="backgroundSecondary"
        >
          <DoggoBox alignX={FlexAlign.Center} padding={{ bottom: SizesEnum.Large }} column>
            <DoggoBox padding={{ bottom: SizesEnum.Small }}>
              <DoggoText variant={DoggoTextVariant.Title1}>
                <FormattedMessage id={title} />
              </DoggoText>
            </DoggoBox>
            <DoggoText variant={DoggoTextVariant.Headline}>
              <FormattedMessage id={description} />
            </DoggoText>
          </DoggoBox>
          <DoggoBox width={BoxWidth.Full} alignX={FlexAlign.Center} column>
            {children}
          </DoggoBox>
        </DoggoBox>
      </DoggoContainer>
    </DoggoBox>
  );
};

export default Auth;
