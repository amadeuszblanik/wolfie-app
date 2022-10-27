import { FormSignUp } from "../../src/form";
import { LayoutAuth } from "../../src/layout";
import type { NextPage } from "next";

const SignUp: NextPage = () => (
  <LayoutAuth title="page.sign_up.header" description="page.sign_up.description">
    <FormSignUp />
  </LayoutAuth>
);

export default SignUp;
