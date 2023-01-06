import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { BmeBox, BmeText } from "bme-ui";
import { Brand, Container } from "../../atoms";
import { useMobile } from "../../hooks";

interface LayoutAppProps {
  title: string;
  children: React.ReactNode;
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: var(--bme-vh, 100vh);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
  }
`;

const Layout: React.FC<LayoutAppProps> = ({ title, children }) => {
  const isMobile = useMobile();

  return (
    <>
      <Head>
        <title>Wolfie.app — Authorization</title>
        <meta name="description" content="Your pet management application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>
        <BmeBox
          direction="column"
          alignX="center"
          alignY="center"
          width={isMobile ? "100%" : "50%"}
          padding="md|md"
          background="backgroundSecondary"
        >
          <BmeBox margin="no|no|sm">
            <Brand withLink withName={false} />
          </BmeBox>
          <BmeText variant="Title2">{title}</BmeText>
        </BmeBox>
        <BmeBox
          direction="column"
          alignX="center"
          alignY="center"
          width={isMobile ? "100%" : "50%"}
          minHeight="var(--bme-vh, 100vh)"
          padding="md|no"
        >
          <Container>{children}</Container>
        </BmeBox>
      </StyledMain>
    </>
  );
};

export default Layout;
