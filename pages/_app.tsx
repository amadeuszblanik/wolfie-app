import { ThemeProvider } from "styled-components";
import { BmeGlobalStyle, BmeThemeProvider } from "bme-ui";
import { useRouter } from "next/router";
import React from "react";
import { IntlProvider } from "react-intl";
import { locales, theme } from "../src/settings";
import { GlobalStyles } from "../src/components";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale as keyof typeof locales;

  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <BmeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BmeGlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </BmeThemeProvider>
    </IntlProvider>
  );
}
