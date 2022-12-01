import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import Image from "next/image";
import { DoggoBox, DoggoText } from "../../src/ui-components";
import useGdpr from "../../src/api/queries/gdpr";
import { BoxWidth, FlexAlign } from "../../src/ui-components/box";
import { SizesEnum } from "../../src/settings/sizes";
import { DoggoTextVariant } from "../../src/ui-components/text";
import { LayoutHeadless } from "../../src/layout";
import type { NextPage } from "next";

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
    <LayoutHeadless>
      <header>
        <DoggoBox column alignX={FlexAlign.Center} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
          <DoggoBox padding={{ y: SizesEnum.ExtraLarge }}>
            <Image src="/logo.svg" alt="Doggo logo" width={200} height={200} />
          </DoggoBox>
          <DoggoBox padding={{ bottom: SizesEnum.Large }}>
            <DoggoText variant={DoggoTextVariant.LargeTitle} leading>
              <FormattedMessage id="page.privacy_policy.head.title" />
            </DoggoText>
          </DoggoBox>
        </DoggoBox>
      </header>

      <DoggoBox width={BoxWidth.Full} padding={{ bottom: SizesEnum.ExtraLarge2 }}>
        {response && <StyledContent dangerouslySetInnerHTML={{ __html: response.html }} />}
        {error && (
          <StyledContent
            dangerouslySetInnerHTML={{ __html: error.message || intl.formatMessage({ id: "error.load_fail" }) }}
          />
        )}
      </DoggoBox>
    </LayoutHeadless>
  );
};

export default PrivacyPolicy;
