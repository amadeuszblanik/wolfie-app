import type { NextPage } from "next";
import Head from "next/head";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoText } from "../src/ui-components";
import useGdpr from "../src/api/queries/gdpr";
import { BoxWidth, FlexAlign } from "../src/ui-components/box";
import { SizesEnum } from "../src/settings/sizes";
import { DoggoTextVariant } from "../src/ui-components/text";
import { FormattedMessage, useIntl } from "react-intl";
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

const PrivacyPolicy: NextPage = () => {
  const intl = useIntl();
  const { response, error } = useGdpr();

  return (
    <>
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
          {response && <StyledContent dangerouslySetInnerHTML={{ __html: response.html }} />}
          {error && (
            <StyledContent
              dangerouslySetInnerHTML={{ __html: error.message || intl.formatMessage({ id: "error.load_fail" }) }}
            />
          )}
        </DoggoBox>
      </DoggoContainer>
    </>
  );
};

export default PrivacyPolicy;
