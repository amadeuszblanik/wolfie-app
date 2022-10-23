import type { NextPage } from "next";
import Head from "next/head";
import { FormSignUp } from "../../src/form";
import { LayoutAuth } from "../../src/layout";

const SignUp: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/Users/ablanik/Projects/Blanik.me/doggo/web-react/doggo-web-react/public/favicon.ico" />
      </Head>

      <LayoutAuth title="page.sign_up.header" description="page.sign_up.description">
        <FormSignUp />
      </LayoutAuth>
    </div>
  );
};

export default SignUp;
