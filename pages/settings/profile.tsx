import type { NextPage } from "next";
import Head from "next/head";
import { useIntl } from "react-intl";
import React from "react";
import { LayoutApp } from "../../src/layout";
import { DataDisplayProfile } from "../../src/data-display";

const App: NextPage = () => {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.settings.profile.header" })} back>
      <DataDisplayProfile />
    </LayoutApp>
  );
};

export default App;
