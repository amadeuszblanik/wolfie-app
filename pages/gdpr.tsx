import type { NextPage } from "next";
import Head from "next/head";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoText } from "../src/ui-components";
import useGdpr from "../src/api/queries/gdpr";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";
import { SizesEnum } from "../src/settings/sizes";
import { DoggoTextVariant } from "../src/ui-components/text";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import styled from "styled-components";

const StyledContent = styled.div`
  line-height: 1.2;

  a {
    color: ${({ theme }) => theme.palette.blue};
  }

  b,
  strong {
    font-weight: 600;
  }

  i {
    font-style: italic;
  }

  [id] {
    font-size: 1.5rem;
  }
`;

const Gdpr: NextPage = () => {
  const { response, error } = useGdpr();

  return (
    <div>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <DoggoBox column alignX={FlexAlign.Center} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
          <DoggoBox padding={{ y: SizesEnum.ExtraLarge }}>
            <img src="/logo.svg" alt="Doggo logo" width={200} />
          </DoggoBox>
          <DoggoBox padding={{ bottom: SizesEnum.Large }}>
            <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
              <FormattedMessage id="page.privacy_policy.head.title" />
            </DoggoText>
          </DoggoBox>
          <Link href={"/"}>
            <a>
              <DoggoButton variant="blue">
                <FormattedMessage id="page.privacy_policy.go_home" />
              </DoggoButton>
            </a>
          </Link>
        </DoggoBox>
      </header>

      <DoggoContainer>
        <DoggoBox width={BoxWidth.Full} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
          <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
            <FormattedMessage id="common.soon" />
          </DoggoText>
        </DoggoBox>
      </DoggoContainer>
    </div>
  );
};

export default Gdpr;
