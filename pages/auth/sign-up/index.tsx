import { FormattedMessage, useIntl } from "react-intl";
import { BmeBox, BmeButton } from "bme-ui";
import { LayoutAuth } from "../../../src/layouts";
import { FormSignUp } from "../../../src/form";
import { SignInWithApple } from "../../../src/components";
import { Link } from "../../../src/atoms";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_up.title" })}>
      <SignInWithApple />
      <FormSignUp />
      <BmeBox direction="column" alignX="center" margin="md|no|no">
        <Link href="/auth/sign-in">
          <BmeButton variant="background">
            <FormattedMessage id="common.form.sign_in.label" />
          </BmeButton>
        </Link>
        <Link href="/privacy-policy">
          <BmeButton variant="background">
            <FormattedMessage id="common.form.read_gdpr.label" />
          </BmeButton>
        </Link>
      </BmeBox>
    </LayoutAuth>
  );
}
