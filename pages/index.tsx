import type { NextPage } from "next";
import Head from "next/head";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoList, DoggoText } from "../src/ui-components";
import { DoggoTextVariant } from "../src/ui-components/text";
import { SizesEnum } from "../src/settings/sizes";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { useSignedIn } from "../src/hooks";

const Home: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const signedIn = useSignedIn();

  return (
    <div>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <DoggoBox column alignX={FlexAlign.Center}>
          <DoggoBox padding={{ y: SizesEnum.ExtraLarge }}>
            <img src="/logo.svg" alt="Doggo logo" width={200} />
          </DoggoBox>
          <DoggoBox padding={{ bottom: SizesEnum.Large }}>
            <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
              <FormattedMessage id="page.home.head.title" />
            </DoggoText>
          </DoggoBox>
          <DoggoText>
            <FormattedMessage id="page.home.head.description" />
          </DoggoText>
        </DoggoBox>
      </header>

      <main>
        <DoggoBox padding={{ top: SizesEnum.Medium, bottom: SizesEnum.ExtraLarge }}>
          <DoggoContainer>
            <DoggoBox column alignX={FlexAlign.Center} width={BoxWidth.Full}>
              <DoggoText noBottomMargin>
                <FormattedMessage id="page.home.main.current_features" />
              </DoggoText>
              <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }}>
                <DoggoList
                  items={[
                    intl.formatMessage({ id: "page.home.main.features_list.weight" }),
                    intl.formatMessage({ id: "page.home.main.features_list.medications" }),
                    intl.formatMessage({ id: "page.home.main.features_list.vaccination" }),
                  ]}
                ></DoggoList>
              </DoggoBox>
              <DoggoText noBottomMargin>
                <FormattedMessage id="page.home.main.planned_features_list" />
              </DoggoText>
              <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }}>
                <DoggoList
                  items={[
                    intl.formatMessage({ id: "page.home.main.features_list.dog_park" }),
                    intl.formatMessage({ id: "page.home.main.features_list.walk_tinder" }),
                    intl.formatMessage({ id: "page.home.main.features_list.dog_walk_tracking" }),
                    intl.formatMessage({ id: "page.home.main.features_list.ai_enhanced" }),
                    intl.formatMessage({ id: "page.home.main.features_list.more" }),
                  ]}
                ></DoggoList>
              </DoggoBox>
              <DoggoText variant={DoggoTextVariant.Title3}>
                <FormattedMessage id="page.home.main.price" />
              </DoggoText>
              <DoggoText variant={DoggoTextVariant.Footnote}>
                <FormattedMessage id="page.home.main.price_details" />
              </DoggoText>
            </DoggoBox>
            <DoggoBox alignX={FlexAlign.Center} padding={{ top: SizesEnum.Large }}>
              {signedIn ? (
                <DoggoButton variant="blue" onClick={() => router.push("/app")}>
                  <FormattedMessage id="common.open_app" />
                </DoggoButton>
              ) : (
                <>
                  <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                    <DoggoButton variant="blue" onClick={() => router.push("/app/auth/sign-in")}>
                      <FormattedMessage id="common.sign_in" />
                    </DoggoButton>
                  </DoggoBox>
                  <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                    <DoggoButton variant="green" onClick={() => router.push("/app/auth/sign-up")}>
                      <FormattedMessage id="common.sign_up" />
                    </DoggoButton>
                  </DoggoBox>
                </>
              )}
            </DoggoBox>
          </DoggoContainer>
        </DoggoBox>
      </main>
    </div>
  );
};

export default Home;
