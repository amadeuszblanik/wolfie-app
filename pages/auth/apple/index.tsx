import { FormattedMessage, useIntl } from "react-intl";
import { BmeBox, BmeButton } from "bme-ui";
import { LayoutAuth } from "../../../src/layouts";
import { SignInWithApple } from "../../../src/components";
import { Link } from "../../../src/atoms";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_in_apple.title" })}>
      <SignInWithApple short />
      <BmeBox direction="column" alignX="center">
        <Link href="/auth/sign-in">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.sign_in.label" />
          </BmeButton>
        </Link>
        <Link href="/auth/sign-up">
          <BmeButton size="small" variant="background">
            <FormattedMessage id="common.form.create_account.label" />
          </BmeButton>
        </Link>
      </BmeBox>
    </LayoutAuth>
  );
}
