import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { LayoutAuth } from "../../../src/layout";
import { DoggoBox, DoggoButton, DoggoInput } from "../../../src/ui-components";

const SignIn: NextPage = () => {
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
        <DoggoButton onClick={() => console.debug("Sign in")}>
          <FormattedMessage id="common.sign_in" />
        </DoggoButton>
      </LayoutAuth>
    </div>
  );
};

export default SignIn;
