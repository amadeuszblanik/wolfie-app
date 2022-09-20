import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { LayoutApp } from "../../src/layout";

const App: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutApp>
        <FormattedMessage id="common.soon" />
      </LayoutApp>
    </div>
  );
};

export default App;
