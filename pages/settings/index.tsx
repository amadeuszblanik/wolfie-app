import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { useRouter } from "next/router";
import { LayoutApp } from "../../src/layout";
import { DoggoList } from "../../src/ui-components";
import { ComponentChangeLanguage, ComponentChangeTheme, ComponentSignOff } from "../../src/component";
import ApiClient from "../../src/api/client";
import type { NextPage } from "next";

const App: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.settings.header" })}>
      <DoggoList>
        <DoggoList.Item onClick={() => router.push("/settings/profile")}>
          <FormattedMessage id="page.settings.items.profile" />
        </DoggoList.Item>
        <DoggoList.Item onClick={() => router.push("/settings/change-password")}>
          <FormattedMessage id="page.settings.items.change_password" />
        </DoggoList.Item>
        <DoggoList.Item onClick={() => router.push("/settings/authorized-devices")}>
          <FormattedMessage id="page.settings.items.authorized_devices" />
        </DoggoList.Item>
        <DoggoList.Item>
          <FormattedMessage id="common.change_language" />
          <ComponentChangeLanguage />
        </DoggoList.Item>
        <DoggoList.Item>
          <FormattedMessage id="common.change_theme" />
          <ComponentChangeTheme />
        </DoggoList.Item>
        <DoggoList.Item>
          <FormattedMessage id="common.sign_off" />
          <ComponentSignOff />
        </DoggoList.Item>
        <DoggoList.Item onClick={() => new ApiClient("en-GB").postTestNotification()}>
          <FormattedMessage id="page.settings.test_notification" />
        </DoggoList.Item>
        <DoggoList.Item onClick={() => router.push("/privacy-policy")}>
          <FormattedMessage id="page.settings.privacy-policy" />,
        </DoggoList.Item>
      </DoggoList>
    </LayoutApp>
  );
};

export default App;
