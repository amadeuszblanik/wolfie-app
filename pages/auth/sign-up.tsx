import type { NextPage } from "next";
import Head from "next/head";
import { FormSignUp } from "../../src/form";
import { LayoutAuth } from "../../src/layout";

const SignUp: NextPage = () => {
  return (
    <LayoutAuth title="page.sign_up.header" description="page.sign_up.description">
      <FormSignUp />
    </LayoutAuth>
  );
};

export default SignUp;
