import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LayoutApp } from "../../../../src/layouts";
import getAuth from "../../../../lib/get-auth";
import { FormChangePassword } from "../../../../src/form";
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

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.profile_change_password.title" })}>
      <FormChangePassword />
    </LayoutApp>
  );
}
