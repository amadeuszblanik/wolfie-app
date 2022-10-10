import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";
import { DoggoButton, DoggoList } from "../../src/ui-components";
import { ButtonSizes } from "../../src/ui-components/button";
import Link from "next/link";
import { ComponentChangeLanguage } from "../../src/component";

const App: NextPage = () => {
  const intl = useIntl();

  const items = [
    <Link key="profile" href="/settings/profile">
      <a>
        <DoggoButton size={ButtonSizes.Small} disabled>
          <FormattedMessage id="page.settings.items.profile" />
        </DoggoButton>
      </a>
    </Link>,
    <Link key="change-password" href="/settings/change-password">
      <a>
        <DoggoButton size={ButtonSizes.Small}>
          <FormattedMessage id="page.settings.items.change_password" />
        </DoggoButton>
      </a>
    </Link>,
    <Link key="authorized-devices" href="/settings/authorized-devices">
      <a>
        <DoggoButton size={ButtonSizes.Small}>
          <FormattedMessage id="page.settings.items.authorized_devices" />
        </DoggoButton>
      </a>
    </Link>,
    [
      <FormattedMessage key="change-language-key" id="common.change_language" />,
      <ComponentChangeLanguage key="change-language-value" />,
    ],
  ];

  return (
    <>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutApp title={intl.formatMessage({ id: "page.settings.header" })}>
        <DoggoList items={items} />
      </LayoutApp>
    </>
  );
};

export default App;
