import type { NextPage } from "next";
import Head from "next/head";
import { LayoutAuth } from "../../src/layout";
import { FormSignIn } from "../../src/form";

const SignIn: NextPage = () => (
  <LayoutAuth title="page.sign_in.header" description="page.sign_in.description">
    <FormSignIn />
  </LayoutAuth>
);

export default SignIn;
