import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { LayoutAuth } from "../../../src/layout";
import { DoggoBox, DoggoButton, DoggoInput, DoggoText } from "../../../src/ui-components";
import useSignIn from "../../../src/api/queries/sign-in";
import { useEffect } from "react";
import { BoxWidth } from "../../../src/ui-components/box";

const SignIn: NextPage = () => {
  const { accessToken, refreshToken, mutate, status, errorMessage } = useSignIn();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug(accessToken, refreshToken);
  });

  return (
    <div>
      <Head>
        <title>Doggo - Your pet companion app</title>
        <meta name="description" content="Pet companion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutAuth title="page.sign_in.header" description="page.sign_in.description">
        <DoggoBox column>
          <DoggoInput label="E-mail" placeholder="joe.doe@doggo.rocks" type="email" errors={["Wrong e-mail format"]} />
          <DoggoInput
            label="Password"
            type="password"
            errors={["Passwords are not the same", "Password do not pass requirements"]}
          />
        </DoggoBox>
        {/* eslint-disable-next-line no-console */}
        <DoggoButton onClick={() => mutate({ username: "amadeusz@blanik.me", password: "Passw0rd!1" })}>
          <FormattedMessage id="common.sign_in" />
        </DoggoButton>
        <DoggoBox width={BoxWidth.Full} background="purple" column>
          <DoggoText>{status}</DoggoText>
          <DoggoText>{accessToken}</DoggoText>
          <DoggoText>{refreshToken}</DoggoText>
          <DoggoText>{errorMessage}</DoggoText>
        </DoggoBox>
      </LayoutAuth>
    </div>
  );
};

export default SignIn;
