import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import getAuth from "../../../../lib/get-auth";
import { LayoutApp } from "../../../../src/layouts";
import { FormVet } from "../../../../src/form";
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
    <LayoutApp title={intl.formatMessage({ id: "page.vet_edit.title" })}>
      <FormVet />
    </LayoutApp>
  );
}
