import { useIntl } from "react-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { BmeBox, BmeText } from "bme-ui";
import { LayoutApp } from "../../src/layouts";
import { getSession } from "../../lib/get-session";
import getAuth from "../../lib/get-auth";
import { useAppDispatch, useAppSelector, useMobile } from "../../src/hooks";
import { petsActions, selectPetsMy, selectPetsMyError, selectPetsMyStatus } from "../../src/store/pets.slice";
import { PetCard } from "../../src/components";

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

export default function Page(_: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const isMobile = useMobile();

  const storePetsMyStatus = useAppSelector(selectPetsMyStatus);
  const storePetsMyError = useAppSelector(selectPetsMyError);
  const storePetsMy = useAppSelector(selectPetsMy);

  useEffect(() => {
    dispatch(petsActions.petsMy());
  }, [dispatch]);

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.app.title" })}>
      <BmeBox wrap width="100%" minHeight="100%">
        {storePetsMy?.map((petProps) => (
          <BmeBox key={petProps.id} width={isMobile ? "100%" : "50%"} padding={isMobile ? "xs|no" : "xs"}>
            <PetCard {...petProps} />
          </BmeBox>
        ))}
      </BmeBox>
      <BmeText>{storePetsMyStatus}</BmeText>
      <BmeText>{storePetsMyError}</BmeText>
    </LayoutApp>
  );
}
