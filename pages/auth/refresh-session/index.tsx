import { FormattedMessage, useIntl } from "react-intl";
import { BmeBox, BmeButton, BmeProgressBar } from "bme-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LayoutAuth } from "../../../src/layouts";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import {
  authActions,
  selectAuthRefreshSessionError,
  selectAuthRefreshSessionStatus,
  selectAuthRefreshToken,
} from "../../../src/store/auth.slice";
import { cookie } from "../../../src/utils";
import { ErrorMessage } from "../../../src/components";
import { Link } from "../../../src/atoms";
import { getSession } from "../../../lib/get-session";

const DEFAULT_REFRESH_SESSION_TIMEOUT = 5000;

export const getServerSideProps: GetServerSideProps<{ lastPage: string }> = async (context) => {
  const session = await getSession(context.req, context.res);

  return {
    props: {
      lastPage: session.lastPage || "/app",
    },
  };
};

export default function Page({ lastPage }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeAuthRefreshToken = useAppSelector(selectAuthRefreshToken);
  const storeAuthRefreshSessionStatus = useAppSelector(selectAuthRefreshSessionStatus);
  const storeAuthRefreshSessionError = useAppSelector(selectAuthRefreshSessionError);

  const isIdle = storeAuthRefreshSessionStatus === "idle";
  const isLoading = storeAuthRefreshSessionStatus === "pending";
  const isFailed = storeAuthRefreshSessionStatus === "error";
  const isSuccess = storeAuthRefreshSessionStatus === "success";

  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    setRefreshToken(storeAuthRefreshToken || cookie.get("refreshToken") || localStorage.getItem("refreshToken"));
  }, [storeAuthRefreshToken]);

  useEffect(() => {
    if (refreshToken) {
      dispatch(authActions.refreshSession({ refreshToken }));
    }
  }, [refreshToken]);

  useEffect(() => {
    if (storeAuthRefreshSessionStatus === "success") {
      void router.push(lastPage);
    }

    if (storeAuthRefreshSessionStatus === "error") {
      setTimeout(() => {
        void router.push("/auth/sign-in");
      }, DEFAULT_REFRESH_SESSION_TIMEOUT);
    }
  }, [storeAuthRefreshSessionStatus]);

  return (
    <LayoutAuth title={intl.formatMessage({ id: "page.auth_refresh_session.title" })}>
      {isLoading && <BmeProgressBar />}
      {(isFailed || isIdle) && (
        <BmeBox direction="column" alignX="center" alignY="center">
          <BmeBox margin="no|no|sm">
            <ErrorMessage
              messages={[storeAuthRefreshSessionError || intl.formatMessage({ id: "page.auth_refresh_session.error" })]}
            />
          </BmeBox>

          <Link href="/auth/sign-in">
            <BmeButton>
              <FormattedMessage id="page.auth_refresh_session.error.button" />
            </BmeButton>
          </Link>
        </BmeBox>
      )}
      {isSuccess && (
        <BmeBox alignX="center" alignY="center">
          <Link href="/app">
            <BmeButton>
              <FormattedMessage id="page.auth_refresh_session.success" />
            </BmeButton>
          </Link>
        </BmeBox>
      )}
    </LayoutAuth>
  );
}
