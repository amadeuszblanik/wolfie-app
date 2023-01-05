import { GetServerSidePropsContext } from "next/types";

const getAuth = (context: GetServerSidePropsContext) => {
  const cookies = context.req.cookies;

  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;
  const isSignedIn = !!accessToken;

  return {
    accessToken,
    refreshToken,
    isSignedIn,
  };
};

export default getAuth;
