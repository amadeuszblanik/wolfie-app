import { NextPage } from "next";
import { useIntl } from "react-intl";
import { ComponentErrorScreen } from "../src/component";
import { LayoutError } from "../src/layout";

const Unauthorized: NextPage = () => {
  const intl = useIntl();

  return (
    <LayoutError>
      <ComponentErrorScreen message={intl.formatMessage({ id: "error.server.401" })} />
    </LayoutError>
  );
};

export default Unauthorized;
