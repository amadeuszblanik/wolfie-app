import type { NextPage } from "next";
import Head from "next/head";
import { FormForgotPasswordStep0, FormForgotPasswordStep1 } from "../../src/form";
import { LayoutAuth } from "../../src/layout";
import { useRouter } from "next/router";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <LayoutAuth title="page.forgot_password.header" description="page.forgot_password.description">
      {!token && <FormForgotPasswordStep0 />}
      {token && <FormForgotPasswordStep1 token={token as string} />}
    </LayoutAuth>
  );
};

export default ForgotPassword;
