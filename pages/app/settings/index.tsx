import { FormattedMessage, useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BmeBox, BmeIcon, BmeList, BmeSpinner, BmeText } from "bme-ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { LayoutApp } from "../../../src/layouts";
import getAuth from "../../../lib/get-auth";
import { getSession } from "../../../lib/get-session";
import { ApiService } from "../../../src/services";
import { ApiStatus } from "../../../src/services/api/types/status.type";

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

  const [testNotificationState, setTestNotificationState] = useState<ApiStatus>("idle");

  const handleTestNotification = async () => {
    setTestNotificationState("pending");

    try {
      const response = await new ApiService().authTestNotification();

      if (response) {
        setTestNotificationState("success");
      }
    } catch (error) {
      setTestNotificationState("error");
    }
  };

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
        <BmeList.Item onClick={handleTestNotification}>
          <BmeBox alignY="center">
            {testNotificationState !== "idle" && (
              <BmeBox padding="no|xs|no|no" alignY="center">
                {testNotificationState === "pending" && <BmeSpinner variant="text" size="small" />}
                {testNotificationState === "success" && <BmeIcon name="checkmark" color="green" />}
                {testNotificationState === "error" && <BmeIcon name="close" color="red" />}
              </BmeBox>
            )}{" "}
            <FormattedMessage id="page.settings.link.test_notification" />
          </BmeBox>
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
