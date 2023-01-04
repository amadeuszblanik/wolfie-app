import { FormattedMessage, useIntl } from "react-intl";
import { BmeBox, BmeText } from "bme-ui";
import Image from "next/image";
import styled from "styled-components";
import { Link } from "../../atoms";
import { useMobile } from "../../hooks";

const StyledMockedWrapper = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};

  & > img {
    position: relative !important;
    height: auto !important;
  }
`;

const Component = () => {
  const intl = useIntl();

  const isMobile = useMobile();

  return (
    <BmeBox direction={isMobile ? "column" : "row"} alignY="center" minHeight="90vh" padding="md|no">
      <BmeBox
        width={isMobile ? "100%" : "50%"}
        direction="column"
        alignY="center"
        padding={isMobile ? "sm|md" : "md"}
        background="backgroundSecondary"
        border="blue"
        rounded
      >
        <BmeText variant="LargeTitle" leading>
          <FormattedMessage id="section.hello.title" />
        </BmeText>
        <BmeText variant="Title2">
          <FormattedMessage id="section.hello.description" />
        </BmeText>

        <BmeBox padding="md|no">
          <Link href="/about">
            <Image
              src={`/download/app-store/${intl.locale}.svg`}
              alt={intl.formatMessage({ id: "section.hello.download.app_store" })}
              width={150}
              height={50}
            />
          </Link>
        </BmeBox>

        <Link href="/app/app">
          <BmeText>
            <FormattedMessage id="section.hello.web_app" />
          </BmeText>
        </Link>
      </BmeBox>

      <BmeBox width={isMobile ? "100%" : "50%"} alignY="center" padding={isMobile ? "md|no|no" : "md|no|md|md"}>
        <StyledMockedWrapper>
          <Image src="/app-mock-up.png" alt="Mocked app app preview" fill />
        </StyledMockedWrapper>
      </BmeBox>
    </BmeBox>
  );
};

export default Component;
