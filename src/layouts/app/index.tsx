import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { Container } from "../../atoms";
import { Footer, SideBar } from "../../components";

interface LayoutAppProps {
  title: string;
  children: React.ReactNode;
}

const StyledMain = styled.main`
  margin-top: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    margin-top: 24px;
  }
`;

const Layout: React.FC<LayoutAppProps> = ({ title, children }) => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Wolfie.app</title>
        <meta name="description" content="Your pet management application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideBar title={title}>
        <SideBar.Item icon="paw" label={intl.formatMessage({ id: "layout.app.menu.pets" })} href="/app" />
        <SideBar.Item icon="paw" label={intl.formatMessage({ id: "layout.app.menu.pet_add" })} href="/app/pet/add" />
      </SideBar>
      <StyledMain>
        <Container>{children}</Container>
      </StyledMain>
      <Footer />
    </>
  );
};

export default Layout;
