import type { NextPage } from "next";
import Head from "next/head";
import { useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";
import { DataDisplayAuthorizedDevices } from "../../src/data-display";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.settings.authorized_devices.header" })} back>
        <DataDisplayAuthorizedDevices />
      </LayoutApp>
    </>
  );
};

export default App;
