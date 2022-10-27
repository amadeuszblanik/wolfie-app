import { NextPage, NextPageContext } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { ComponentErrorScreen } from "../src/component";
import { LayoutError } from "../src/layout";

interface Props {
  statusCode?: number;
}

const DEFAULT_STATUS_CODE = 404;

const Error: NextPage<Props> = ({ statusCode }) => {
  const intl = useIntl();
  const router = useRouter();
  const { errorCode } = router.query;

  return (
    <LayoutError>
      <ComponentErrorScreen
        message={
          errorCode || statusCode
            ? intl.formatMessage({ id: `error.server.${errorCode || statusCode}` })
            : intl.formatMessage({ id: "error.client.unknown" })
        }
      />
    </LayoutError>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : DEFAULT_STATUS_CODE;

  return { statusCode };
};

export default Error;
