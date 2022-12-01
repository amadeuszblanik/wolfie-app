import { LayoutAuth } from "../../src/layout";
import { FormSignIn } from "../../src/form";
import type { NextPage } from "next";

const SignIn: NextPage = () => (
  <LayoutAuth title="page.sign_in.header" description="page.sign_in.description">
    <FormSignIn />
  </LayoutAuth>
);

export default SignIn;
