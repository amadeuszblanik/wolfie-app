import { NextPage } from "next";
import { ComponentErrorScreen } from "../src/component";
import { LayoutError } from "../src/layout";
import { useIntl } from "react-intl";

const Unauthorized: NextPage = () => {
  const intl = useIntl();

  return (
    <LayoutError>
      <ComponentErrorScreen message={intl.formatMessage({ id: "error.server.401" })} />
    </LayoutError>
  );
};

export default Unauthorized;
