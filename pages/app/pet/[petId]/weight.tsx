import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LayoutApp } from "../../../../src/layouts";
import { ScenePetWeight } from "../../../../src/scene";
import getAuth from "../../../../lib/get-auth";

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

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_id_weight.title" })}>
      <ScenePetWeight />
    </LayoutApp>
  );
}
