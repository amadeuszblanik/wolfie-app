import { FormattedMessage, useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BmeList, BmeText } from "bme-ui";
import { useRouter } from "next/router";
import { LayoutApp } from "../../../../src/layouts";
import getAuth from "../../../../lib/get-auth";
import { getSession } from "../../../../lib/get-session";

// @TODO: To be changed in the future

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
  const router = useRouter();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.profile.title" })}>
      <BmeList>
        <BmeList.Item onClick={() => void router.push("/app/settings/profile/update")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.update_profile" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item onClick={() => void router.push("/app/settings/profile/change-password")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.change_password" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item onClick={() => void router.push("/app/settings/profile/delete")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.delete_account" />
          </BmeText>
        </BmeList.Item>
      </BmeList>
    </LayoutApp>
  );
}
