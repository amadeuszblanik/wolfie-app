import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LayoutApp } from "../../src/layouts";
import { getSession } from "../../lib/get-session";
import getAuth from "../../lib/get-auth";

export const getServerSideProps: GetServerSideProps<{ isSignedId: boolean }> = async (context) => {
  const session = await getSession(context.req, context.res);
  const { accessToken, refreshToken, isSignedIn } = getAuth(context);

  // eslint-disable-next-line no-console
  console.debug("session", session);
  // eslint-disable-next-line no-console
  console.debug("accessToken", accessToken);
  // eslint-disable-next-line no-console
  console.debug("refreshToken", refreshToken);

  if (!isSignedIn) {
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

export default function Page({ isSignedId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.app.title" })}>App: {isSignedId ? "User" : "Guest"}</LayoutApp>
  );
}
