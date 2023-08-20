import React from "react";
import Head from "next/head";
import { BmeBox, BmeButton } from "bme-ui";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Footer, TopBar } from "../../components";
import { Brand, Container, Link } from "../../atoms";

// @TODO: Displayed as a div for now, but should be a main. Looks like a bug in the styled-components that doesnt allow to use main as a styled component.
const StyledMain = styled.div`
  margin-top: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    margin-top: 24px;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
        <>
          <BmeBox padding="no|md|no|no">
            <Link href="download">
              <BmeButton size="small">
                <FormattedMessage id="layout.landing.menu.download" />
              </BmeButton>
            </Link>
          </BmeBox>
        </>
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

export default Layout;
