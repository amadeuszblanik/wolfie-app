import type { NextPage } from "next";
import Head from "next/head";
import { LayoutAuth } from "../../../src/layout";
import { FormSignIn } from "../../../src/form";

const SignIn: NextPage = () => (
  <div>
    <Head>
      <title>Wolfie.app - Your pet companion app</title>
      <meta name="description" content="Pet companion app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <LayoutAuth title="page.sign_in.header" description="page.sign_in.description">
      <FormSignIn />
    </LayoutAuth>
  </div>
);

export default SignIn;
