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
  height: var(--bme-vh, 100vh);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  overflow-y: scroll;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    height: var(--bme-vh, 100vh);
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
        <BmeBox alignX="center" alignY="center" width={isMobile ? "100%" : "50%"}>
          <StyledContent>
            <BmeBox direction="column" alignX="center" alignY="center" width="100%" margin="auto|no" padding="md|no">
              <Container>{children}</Container>
            </BmeBox>
          </StyledContent>
        </BmeBox>
      </StyledMain>
    </>
  );
};

export default Layout;
