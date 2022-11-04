import { ThemeProvider } from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import fr_FR from "../lang/fr-FR.json";
import pl_PL from "../lang/pl-PL.json";
import en_GB from "../lang/en-GB.json";
import { GlobalStyles } from "../src/component/styles";
import theme from "../src/settings/theme";
import { ComponentFirebase, ComponentFooter } from "../src/component";
import { ConfigContext } from "../src/context/config.context";
import { ConfigStore, FirebaseStore } from "../src/context";
import { cssVariable } from "../src/utils";
import type { AppProps } from "next/app";

const MESSAGES = {
  "en-GB": en_GB,
  "fr-FR": fr_FR,
  "pl-PL": pl_PL,
};

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 86400000, // 24 hours
            staleTime: 2000,
            retry: 0,
            networkMode: "offlineFirst",
          },
        },
      }),
  );

  const locale = useRouter().locale as keyof typeof MESSAGES;

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const updateFullHeight = useCallback(() => {
    cssVariable.set("full-height", `${window.innerHeight}px`);
  }, []);

  useEffect(() => {
    updateFullHeight();
    window.addEventListener("resize", updateFullHeight);

    return () => window.removeEventListener("resize", updateFullHeight);
  }, [updateFullHeight]);

  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <FirebaseStore>
            <ConfigStore>
              <ConfigContext.Consumer>
                {({ selectedTheme }) => (
                  <ThemeProvider theme={theme[selectedTheme]}>
                    <Head>
                      <title>Wolfie.app - Your pet companion app</title>
                      <meta name="description" content="Pet companion app" />
                      <meta charSet="utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FFDBB8" />
                      <link rel="manifest" href="/manifest.webmanifest" />
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
                    <ComponentFooter />
                    <ComponentFirebase />
                  </ThemeProvider>
                )}
              </ConfigContext.Consumer>
            </ConfigStore>
          </FirebaseStore>
          <ReactQueryDevtools initialIsOpen />
        </Hydrate>
      </QueryClientProvider>
    </IntlProvider>
  );
}

export default MyApp;
