import { useIntl } from "react-intl";
import { LayoutAuth } from "../../../src/layouts";

export default function Page() {
  const intl = useIntl();

  return <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_in.title" })}>Sign in</LayoutAuth>;
}
