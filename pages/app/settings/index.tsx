import { FormattedMessage, useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BmeList, BmeText } from "bme-ui";
import { useRouter } from "next/router";
import { LayoutApp } from "../../../src/layouts";
import getAuth from "../../../lib/get-auth";

export const getServerSideProps: GetServerSideProps<{ isSignedId: boolean }> = async (context) => {
  const { isSignedIn } = getAuth(context);

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

export default function Page(_: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const intl = useIntl();
  const router = useRouter();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.settings.title" })}>
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
        <BmeList.Item onClick={() => void router.push("/app/settings/security/authorized-devices")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.authorized_devices" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item onClick={() => void router.push("/privacy-policy")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.privacy_policy" />
          </BmeText>
        </BmeList.Item>
      </BmeList>
      <BmeList>
        <BmeList.Item onClick={() => {}}>
          <FormattedMessage id="page.settings.link.test_notification" />
        </BmeList.Item>
      </BmeList>
      <BmeList>
        <BmeList.Item onClick={() => void router.push("/app/settings/profile/delete")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.delete_account" />
          </BmeText>
        </BmeList.Item>
        <BmeList.Item onClick={() => void router.push("/auth/sign-off")}>
          <BmeText>
            <FormattedMessage id="page.settings.link.sign_off" />
          </BmeText>
        </BmeList.Item>
      </BmeList>
    </LayoutApp>
  );
}
