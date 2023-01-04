import { useIntl } from "react-intl";
import { LayoutApp } from "../../src/layouts";

export default function Page() {
  const intl = useIntl();

  return <LayoutApp title={intl.formatMessage({ id: "page.app.title" })}>App</LayoutApp>;
}
