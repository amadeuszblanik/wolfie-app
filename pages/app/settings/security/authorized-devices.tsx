import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BmeList, BmeText, pipeDate } from "bme-ui";
import { useEffect } from "react";
import { LayoutApp } from "../../../../src/layouts";
import getAuth from "../../../../lib/get-auth";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks";
import {
  refreshTokenActions,
  selectRefreshTokenGetData,
  selectRefreshTokenGetError,
  selectRefreshTokenGetStatus,
} from "../../../../src/store/refresh-token.slice";
import { ErrorMessage, Loader } from "../../../../src/components";
import { getSession } from "../../../../lib/get-session";

export const getServerSideProps: GetServerSideProps<{ isSignedId: boolean }> = async (context) => {
  const session = await getSession(context.req, context.res);
  const { refreshToken, isSignedIn } = getAuth(context);
  session.lastPage = context.resolvedUrl;

  if (!isSignedIn) {
    if (refreshToken) {
      return {
        redirect: {
          destination: "/auth/sign-off",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isSignedId: isSignedIn,
    },
  };
};

export default function Page(_: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const storeRefreshTokenGetStatus = useAppSelector(selectRefreshTokenGetStatus);
  const storeRefreshTokenGetError = useAppSelector(selectRefreshTokenGetError);
  const storeRefreshTokenGetData = useAppSelector(selectRefreshTokenGetData);

  const isLoading = storeRefreshTokenGetStatus === "pending" || storeRefreshTokenGetStatus === "idle";

  useEffect(() => {
    dispatch(refreshTokenActions.get());
  }, []);

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.security_authorized_devices.title" })}>
      {storeRefreshTokenGetStatus === "error" ? (
        <ErrorMessage messages={[storeRefreshTokenGetError || intl.formatMessage({ id: "error.generic_fetch" })]} />
      ) : (
        <BmeList>
          {storeRefreshTokenGetData?.map((item) => (
            <BmeList.Item key={item.id}>
              <BmeText>{item.device}</BmeText>
              <BmeText>{pipeDate(item.expiration)}</BmeText>
            </BmeList.Item>
          ))}
        </BmeList>
      )}
      {isLoading && <Loader />}
    </LayoutApp>
  );
}
