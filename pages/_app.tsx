import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme, { ThemeVariants } from "../src/settings/theme";
import { useEffect, useState } from "react";
import { ConfigContext } from "../src/context";
import { GlobalStyles } from "../src/component/styles";
import en_GB from "../lang/en-GB.json";
import pl_PL from "../lang/pl-PL.json";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";

const MESSAGES = {
  "en-GB": en_GB,
  "pl-PL": pl_PL,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariants>(ThemeVariants.Dark);

  const locale = useRouter().locale as keyof typeof MESSAGES;

  useEffect(() => {
    // @TODO: Remove on production
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.setSelectedTheme = setSelectedTheme;
  });

  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <ConfigContext.Provider value={{ selectedTheme, setSelectedTheme }}>
        <ThemeProvider theme={theme[selectedTheme]}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </ConfigContext.Provider>
    </IntlProvider>
  );
}

export default MyApp;
