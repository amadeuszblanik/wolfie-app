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
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "react-query/devtools";
import Head from "next/head";

const MESSAGES = {
  "en-GB": en_GB,
  "pl-PL": pl_PL,
};

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any }>) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariants>(ThemeVariants.Dark);
  const [queryClient] = useState(() => new QueryClient());

  const locale = useRouter().locale as keyof typeof MESSAGES;

  useEffect(() => {
    // @TODO: Remove on production
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.setSelectedTheme = setSelectedTheme;
  });

  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ConfigContext.Provider value={{ selectedTheme, setSelectedTheme }}>
            <ThemeProvider theme={theme[selectedTheme]}>
              <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="manifest" href="manifest.webmanifest" />
                <meta name="msapplication-TileColor" content="#FFDBB8" />
                <meta name="theme-color" content="#0A0A0A" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                  viewport-fit="cover"
                />
                <meta name="HandheldFriendly" content="true" />
              </Head>
              <GlobalStyles />
              <Component {...pageProps} />
            </ThemeProvider>
          </ConfigContext.Provider>
          <ReactQueryDevtools initialIsOpen />
        </Hydrate>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default MyApp;
