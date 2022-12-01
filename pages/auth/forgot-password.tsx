import { useRouter } from "next/router";
import { FormForgotPasswordStep0, FormForgotPasswordStep1 } from "../../src/form";
import { LayoutAuth } from "../../src/layout";
import type { NextPage } from "next";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const token = router.query.token as string;

  return (
    <LayoutAuth title="page.forgot_password.header" description="page.forgot_password.description">
      {!token && <FormForgotPasswordStep0 />}
      {token && <FormForgotPasswordStep1 token={token} />}
    </LayoutAuth>
  );
};

export default ForgotPassword;
