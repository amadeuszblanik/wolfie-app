import { FormattedMessage } from "react-intl";
import { LayoutLanding } from "../src/layouts";
import { SectionHello } from "../src/sections";

export default function Home() {
  return (
    <LayoutLanding>
      <SectionHello />
      <FormattedMessage id="common.hello" />, <FormattedMessage id="app.name" />!
    </LayoutLanding>
  );
}
