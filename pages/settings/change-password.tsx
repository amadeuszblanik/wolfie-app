import type { NextPage } from "next";
import Head from "next/head";
import { useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";
import { FormChangePassword } from "../../src/form";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.settings.change_password.header" })} back>
        <FormChangePassword />
      </LayoutApp>
    </>
  );
};

export default App;
