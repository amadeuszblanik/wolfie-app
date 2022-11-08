import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useEffect } from "react";
import { LayoutAuth } from "../../src/layout";
import ErrorScreen from "../../src/component/error-screen";
import useConfirmEmail from "../../src/api/queries/confirm-email";
import SuccessScreen from "../../src/component/success-screen";
import ApiWrapper from "../../src/component/api-wrapper";
import type { NextPage } from "next";

const EmailVerification: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const { token } = router.query;

  const { response, post, status, error } = useConfirmEmail();

  useEffect(() => {
    if (!token) {
      return;
    }

    post({ token: token as string });
  }, [token]);

  return (
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
  );
};

export default EmailVerification;
