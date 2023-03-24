import { BmeBox, BmeProgressBar } from "bme-ui";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { LayoutLanding } from "../src/layouts";

// @TODO Add google play - when available

const DEFAULT_COUNTRY = "gb";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const [, country] = navigator.language.split("-");

    void router.push(`https://apps.apple.com/${(country || DEFAULT_COUNTRY).toLowerCase()}/app/wolfie/id6444870861`);
  }, []);

  return (
    <LayoutLanding>
      <BmeBox alignY="center" width="100%" height="80vh">
        <BmeProgressBar />
      </BmeBox>
    </LayoutLanding>
  );
}
