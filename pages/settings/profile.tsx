import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.settings.profile.header" })}>
        <FormattedMessage id="common.soon" />
      </LayoutApp>
    </>
  );
};

export default App;
