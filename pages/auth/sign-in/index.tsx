import { FormattedMessage, useIntl } from "react-intl";
import { BmeBox, BmeButton } from "bme-ui";
import React from "react";
import { LayoutAuth } from "../../../src/layouts";
import { FormSignIn } from "../../../src/form";
import { SignInWithApple } from "../../../src/components";
import { Link } from "../../../src/atoms";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_in.title" })}>
      <SignInWithApple />
      <FormSignIn />
      <BmeBox direction="column" alignX="center" margin="md|no|no">
        <Link href="/auth/forgot-password">
          <BmeButton variant="background">
            <FormattedMessage id="common.form.reset_password.label" />
          </BmeButton>
        </Link>
        <Link href="/auth/sign-up">
          <BmeButton variant="background">
            <FormattedMessage id="common.form.create_account.label" />
          </BmeButton>
        </Link>
      </BmeBox>
    </LayoutAuth>
  );
}
