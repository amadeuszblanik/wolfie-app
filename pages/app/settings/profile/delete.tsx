import { FormattedMessage, useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BmeBox, BmeList, BmeText } from "bme-ui";
import { LayoutApp } from "../../../../src/layouts";
import getAuth from "../../../../lib/get-auth";
import { FormProfileDeactivate, FormProfileDelete } from "../../../../src/form";
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
    <LayoutApp title={intl.formatMessage({ id: "page.profile_delete.title" })}>
      <BmeBox padding="no|md">
        <BmeList label={intl.formatMessage({ id: "page.profile_delete.introduction.label" })}>
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="page.profile_delete.introduction.item_1" />
            </BmeText>
          </BmeList.Item>
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="page.profile_delete.introduction.item_2" />
            </BmeText>
          </BmeList.Item>
        </BmeList>
      </BmeBox>
      <FormProfileDelete />
      <FormProfileDeactivate />
      <BmeBox padding="no|md">
        <BmeList label={intl.formatMessage({ id: "page.profile_delete.back_up.label" })}>
          <BmeList.Item>
            <BmeText>
              <FormattedMessage id="page.profile_delete.back_up.item_1" />
            </BmeText>
          </BmeList.Item>
        </BmeList>
      </BmeBox>
    </LayoutApp>
  );
}
