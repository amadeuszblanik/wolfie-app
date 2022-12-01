import { FormattedMessage } from "react-intl";
import Link from "next/link";
import Image from "next/image";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";
import { SizesEnum } from "../src/settings/sizes";
import { DoggoTextVariant, TextAlignment } from "../src/ui-components/text";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoText } from "../src/ui-components";
import type { NextPage } from "next";

const Gdpr: NextPage = () => (
  <>
    <header>
      <DoggoBox column alignX={FlexAlign.Center} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
        <DoggoBox padding={{ y: SizesEnum.ExtraLarge }}>
          <Image src="/logo.svg" alt="Doggo logo" width={200} height={200} />
        </DoggoBox>
        <DoggoBox padding={{ bottom: SizesEnum.Large }}>
          <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
            <FormattedMessage id="page.contact.head.title" />
          </DoggoText>
        </DoggoBox>
        <Link href={"/"}>
          <a>
            <DoggoButton variant="blue">
              <FormattedMessage id="page.contact.go_home" />
            </DoggoButton>
          </a>
        </Link>
      </DoggoBox>
    </header>

    <DoggoContainer>
      <DoggoBox width={BoxWidth.Full} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
        <DoggoText variant={DoggoTextVariant.Body} leading align={TextAlignment.Center}>
          <FormattedMessage id="page.contact.content" />
        </DoggoText>
      </DoggoBox>
    </DoggoContainer>
  </>
);

export default Gdpr;
