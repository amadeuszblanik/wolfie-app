import type { NextPage } from "next";
import Head from "next/head";
import { LayoutAuth } from "../../../src/layout";
import { useRouter } from "next/router";
import ErrorScreen from "../../../src/component/error-screen";
import { useIntl } from "react-intl";
import useConfirmEmail from "../../../src/api/queries/confirm-email";
import { useEffect } from "react";
import SuccessScreen from "../../../src/component/success-screen";
import ApiWrapper from "../../../src/component/api-wrapper";

const EmailVerification: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const { token } = router.query;

  console.warn("router", router.query);

  const { response, post, status, error } = useConfirmEmail();

  useEffect(() => {
    if (!token) return;

    post({ token: token as string });
  }, [token]);

  console.warn("response", response);
  console.warn("error", error);

  return (
    <div>
      <Head>
        <title>Wolfie.app - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutAuth title="page.email_verification.header">
        {token && (
          <ApiWrapper error={error} status={status}>
            <SuccessScreen message={response?.message} />
          </ApiWrapper>
        )}
        {!token && (
          <ErrorScreen
            title={intl.formatMessage({ id: "page.email_verification.missing_token_title" })}
            message={intl.formatMessage({ id: "page.email_verification.missing_token_message" })}
          />
        )}
      </LayoutAuth>
    </div>
  );
};

export default EmailVerification;
