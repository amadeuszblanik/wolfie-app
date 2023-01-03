import { FormattedMessage } from "react-intl";
import { LayoutLanding } from "../src/layouts";

export default function Home() {
  return (
    <LayoutLanding>
      <main>
        <FormattedMessage id="common.hello" />, <FormattedMessage id="app.name" />!
      </main>
    </LayoutLanding>
  );
}
