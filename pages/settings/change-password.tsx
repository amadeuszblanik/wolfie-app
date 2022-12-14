import { useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";
import { FormChangePassword } from "../../src/form";
import type { NextPage } from "next";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.settings.change_password.header" })} back>
      <FormChangePassword />
    </LayoutApp>
  );
};

export default App;
