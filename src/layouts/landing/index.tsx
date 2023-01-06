import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BmeButton } from "bme-ui";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { detectDevice } from "bme-utils";
import { Footer, TopBar } from "../../components";
import { Brand, Container, Link } from "../../atoms";
import { useLocale } from "../../hooks";

// @TODO: Displayed as a div for now, but should be a main. Looks like a bug in the styled-components that doesnt allow to use main as a styled component.
const StyledMain = styled.div`
  margin-top: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    margin-top: 24px;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { country } = useLocale();
  const [isAvailableDownload, setIsAvailableDownload] = useState(false);

  useEffect(() => {
    const { os } = detectDevice();

    setIsAvailableDownload(os === "iOS");
  }, []);

  return (
    <>
      <Head>
        <title>Wolfie.app — Pet management application</title>
        <meta name="description" content="Your pet management application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar
        left={<Brand withName />}
        right={
          <Link
            href={
              isAvailableDownload ? `https://apps.apple.com/${country.toLowerCase()}/app/wolfie/id6444870861` : "/app"
            }
          >
            <BmeButton size="small">
              <FormattedMessage id={isAvailableDownload ? "layout.landing.menu.download" : "layout.landing.menu.app"} />
            </BmeButton>
          </Link>
        }
      >
        <TopBar.Item href="/#about">
          <FormattedMessage id="layout.landing.menu.about" />
        </TopBar.Item>
        <TopBar.Item href="/#features">
          <FormattedMessage id="layout.landing.menu.features" />
        </TopBar.Item>
        <TopBar.Item href="/#pricing">
          <FormattedMessage id="layout.landing.menu.pricing" />
        </TopBar.Item>
        <TopBar.Item href="/#contact">
          <FormattedMessage id="layout.landing.menu.contact" />
        </TopBar.Item>
      </TopBar>
      <StyledMain>
        <Container>{children}</Container>
      </StyledMain>
      <Footer />
    </>
  );
};

export default Layout;
