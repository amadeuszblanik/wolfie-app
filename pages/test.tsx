import Head from "next/head";
import { BmeBox, BmeButton, BmeIcon, BmeTest, BmeText } from "bme-ui";

import {
  authActions,
  selectAuthAccessToken,
  selectAuthError,
  selectAuthRefreshToken,
  selectAuthStatus,
} from "../src/store/auth.slice";
import { useAppDispatch, useAppSelector } from "../src/hooks";

export const theme = {
  radius: 6,
  colors: {
    primary: "#ee0000",
    red: "#ff453a",
    orange: "#ff9f0a",
    yellow: "#ffd60a",
    green: "#30d158",
    mint: "#66d4cf",
    teal: "#40c8e0",
    cyan: "#64d2ff",
    blue: "#0a84ff",
    indigo: "#5e5ce6",
    purple: "#bf5af2",
    pink: "#ff375f",
    brown: "#ac8e68",
    gray: "#8e8e93",
    gray2: "#636366",
    gray3: "#48484a",
    gray4: "#3a3a3c",
    gray5: "#2c2c2e",
    gray6: "#1c1c1e",
    light: "#f3f3f3",
    dark: "#0a0a0a",
    background: "#0a0a0a",
    backgroundSecondary: "#141414",
    text: "#f3f3f3",
  },
  breakpoints: {
    mobile: 0,
    desktop: 768,
  },
};

export default function Home() {
  const dispatch = useAppDispatch();
  const storeAuthStatus = useAppSelector(selectAuthStatus);
  const storeAuthError = useAppSelector(selectAuthError);
  const storeAuthAccessToken = useAppSelector(selectAuthAccessToken);
  const storeAuthRefreshToken = useAppSelector(selectAuthRefreshToken);

  const handleClick = () => {
    dispatch(
      authActions.signUp({
        username: "amadeusz@blanik.me",
        password: "Passw0rd!1",
        keepSignIn: true,
        device: "web",
      }),
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BmeBox background="primary">
          <BmeIcon name="close-circle" />
          Test
        </BmeBox>
        <BmeTest variant="blue" />

        <BmeText>
          Auth Status: <span>{storeAuthStatus}</span>
        </BmeText>

        <BmeText>
          Auth Error: <span>{storeAuthError}</span>
        </BmeText>

        <BmeText>
          Auth Access Token: <span>{storeAuthAccessToken}</span>
        </BmeText>

        <BmeText>
          Auth Refresh Token: <span>{storeAuthRefreshToken}</span>
        </BmeText>

        <BmeButton onClick={handleClick}>{"Login"}</BmeButton>
      </main>
    </>
  );
}
