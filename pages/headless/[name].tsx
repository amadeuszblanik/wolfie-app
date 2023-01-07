import { BmeBox, BmeProgressBar } from "bme-ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "../../src/atoms";
import { cookie } from "../../src/utils";

// This page is for iOS app purposes only
// This functionalities will be moved to the app

const KNOWN_PATHS: { [key: string]: string } = {
  "authorized-devices": "/app/settings/profile/security/authorized-devices",
  "change-password": "/app/settings/profile/change-password",
  profile: "/app/settings/profile/update",
  "privacy-policy": "/app/settings/privacy-policy",
};

const KNOWN_LOCALES: { [key: string]: string } = {
  "en-GB": "",
  "pl-PL": "/pl-PL",
};

const urlWithLocale = (url: string, locale: string) => {
  if (url.includes(locale)) {
    return url;
  }

  return KNOWN_LOCALES[locale] || "" + url;
};

export default function Page() {
  const router = useRouter();
  const name = router.query.name as string;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const locale = localStorage.getItem("locale") || "en-GB";

    if (!accessToken) {
      void router.push(urlWithLocale("/auth/sign-in", locale));

      return;
    }

    cookie.set("accessToken", accessToken, { path: "/", expires: new Date("2100") });

    const path = KNOWN_PATHS[name] || "/app";

    void router.push(urlWithLocale(path, locale));
  });

  return (
    <Container>
      <BmeBox alignX="center" alignY="center" height="var(--bme-vh)">
        <BmeProgressBar />
      </BmeBox>
    </Container>
  );
}
