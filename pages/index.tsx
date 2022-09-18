import type { NextPage } from "next";
import Head from "next/head";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoList, DoggoText } from "../src/ui-components";
import { DoggoTextVariant } from "../src/ui-components/text";
import { SizesEnum } from "../src/settings/sizes";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";

const Home: NextPage = () => {
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
              Hello Hooman!
            </DoggoText>
          </DoggoBox>
          <DoggoText>I am Doggo, your pet companion app. I will help you to take care of your pet.</DoggoText>
        </DoggoBox>
      </header>

      <main>
        <DoggoBox padding={{ top: SizesEnum.Medium, bottom: SizesEnum.ExtraLarge }}>
          <DoggoContainer>
            <DoggoBox column alignX={FlexAlign.Center} width={BoxWidth.Full}>
              <DoggoText noBottomMargin>Current features:</DoggoText>
              <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }}>
                <DoggoList items={["Weight tracker", "Medication tracker", "Vaccination tracker"]}></DoggoList>
              </DoggoBox>
              <DoggoText noBottomMargin>Planned features:</DoggoText>
              <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Medium }}>
                <DoggoList
                  items={[
                    "Dog park finder",
                    "Walk tinder",
                    "Dog walk tracking",
                    "AI enhanced features",
                    "and much more…",
                  ]}
                ></DoggoList>
              </DoggoBox>
              <DoggoText variant={DoggoTextVariant.Title3}>And all of this is free* and open source*!</DoggoText>
              <DoggoText variant={DoggoTextVariant.Footnote}>
                *during alpha, after that we might introduce some paid features
              </DoggoText>
            </DoggoBox>
            <DoggoBox alignX={FlexAlign.Center} padding={{ top: SizesEnum.Large }}>
              <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                <DoggoButton>Sign in</DoggoButton>
              </DoggoBox>
              <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                <DoggoButton variant="green">Sign up</DoggoButton>
              </DoggoBox>
            </DoggoBox>
          </DoggoContainer>
        </DoggoBox>
      </main>
    </div>
  );
};

export default Home;
