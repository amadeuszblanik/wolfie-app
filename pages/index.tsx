import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import Image from "next/image";
import styled from "styled-components";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoList, DoggoText } from "../src/ui-components";
import { DoggoTextVariant } from "../src/ui-components/text";
import { SizesEnum } from "../src/settings/sizes";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";
import { useSignedIn } from "../src/hooks";
import Topbar from "../src/component/topbar";
import type { NextPage } from "next";

const StyledDescription = styled(DoggoText)`
  line-height: 1.2;
  white-space: pre-line;
`;

const Home: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const signedIn = useSignedIn();

  return (
    <DoggoContainer>
      <Topbar
        title={intl.formatMessage({ id: "page.home.title" })}
        right={
          signedIn ? (
            <DoggoButton variant="blue" onClick={() => router.push("/app")}>
              <FormattedMessage id="common.open_app" />
            </DoggoButton>
          ) : (
            <>
              <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                <DoggoButton variant="blue" onClick={() => router.push("/auth/sign-in")}>
                  <FormattedMessage id="common.sign_in" />
                </DoggoButton>
              </DoggoBox>
              <DoggoBox inline padding={{ x: SizesEnum.Small }}>
                <DoggoButton variant="green" onClick={() => router.push("/auth/sign-up")}>
                  <FormattedMessage id="common.sign_up" />
                </DoggoButton>
              </DoggoBox>
            </>
          )
        }
      />

      <header>
        <DoggoBox column alignX={FlexAlign.Center} padding={{ top: SizesEnum.ExtraLarge2 }}>
          <DoggoBox padding={{ y: SizesEnum.ExtraLarge }}>
            <Image src="/logo.svg" alt="Doggo logo" width={200} height={200} />
          </DoggoBox>
          <DoggoBox padding={{ bottom: SizesEnum.Large }}>
            <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
              <FormattedMessage id="page.home.head.title" />
            </DoggoText>
          </DoggoBox>
          <DoggoText>
            <FormattedMessage id="page.home.head.promotional_text" />
          </DoggoText>
        </DoggoBox>
      </header>

      <main>
        <DoggoBox padding={{ top: SizesEnum.Medium, bottom: SizesEnum.ExtraLarge }} column>
          <DoggoBox column alignX={FlexAlign.Center} width={BoxWidth.Full} padding={{ bottom: SizesEnum.Medium }}>
            <StyledDescription noBottomMargin>
              <FormattedMessage id="page.home.main.description" />
            </StyledDescription>
          </DoggoBox>
          <DoggoBox column alignX={FlexAlign.Center} width={BoxWidth.Full}>
            <DoggoText noBottomMargin>
              <FormattedMessage id="page.home.main.current_features" />
            </DoggoText>
            <DoggoBox width={BoxWidth.Full} padding={{ y: SizesEnum.Large }}>
              <DoggoList>
                <DoggoList.Item>
                  <FormattedMessage id="page.home.main.features_list.weight" />
                </DoggoList.Item>
                <DoggoList.Item>
                  <FormattedMessage id="page.home.main.features_list.health_log" />
                </DoggoList.Item>
                <DoggoList.Item>
                  <FormattedMessage id="page.home.main.features_list.sync" />
                </DoggoList.Item>
              </DoggoList>
            </DoggoBox>
            <DoggoBox column alignX={FlexAlign.Center} width={BoxWidth.Full} padding={{ bottom: SizesEnum.Medium }}>
              <StyledDescription noBottomMargin>
                <FormattedMessage id="page.home.main.description_2" />
              </StyledDescription>
            </DoggoBox>
          </DoggoBox>
        </DoggoBox>
      </main>
    </DoggoContainer>
  );
};

export default Home;
