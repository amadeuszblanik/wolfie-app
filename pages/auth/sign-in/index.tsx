import { useIntl } from "react-intl";
import { LayoutAuth } from "../../../src/layouts";
import { FormSignIn } from "../../../src/form";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_sign_in.title" })}>
      <FormSignIn />
    </LayoutAuth>
  );
}
