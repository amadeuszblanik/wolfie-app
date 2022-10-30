import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import Link from "next/link";
import { LayoutApp } from "../../src/layout";
import { DoggoButton, DoggoListDeprecated } from "../../src/ui-components";
import { ButtonSizes } from "../../src/ui-components/button";
import { ComponentChangeLanguage, ComponentChangeTheme, ComponentSignOff } from "../../src/component";
import ApiClient from "../../src/api/client";
import type { NextPage } from "next";

const App: NextPage = () => {
  const intl = useIntl();

  const items = [
    <Link key="profile" href="/settings/profile">
      <a>
        <DoggoButton size={ButtonSizes.Small}>
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
    [
      <FormattedMessage key="change-theme" id="common.change_theme" />,
      <ComponentChangeTheme key="change-theme-value" />,
    ],
    [<FormattedMessage key="change-theme" id="common.sign_off" />, <ComponentSignOff key="change-theme-value" />],
    [
      <FormattedMessage key="test-notification" id="page.settings.test_notification" />,
      <DoggoButton key="test-notification-value" onClick={() => new ApiClient("en-GB").postTestNotification()}>
        <FormattedMessage id="common.send" />
      </DoggoButton>,
    ],
  ];

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.settings.header" })}>
      <DoggoListDeprecated items={items} />
    </LayoutApp>
  );
};

export default App;
