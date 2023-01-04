import { ThemeProvider } from "styled-components";
import { BmeGlobalStyle, BmeThemeProvider } from "bme-ui";
import { useRouter } from "next/router";
import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { locales, theme } from "../src/settings";
import { GlobalStyles } from "../src/components";
import { wrapper } from "../src/store";
import type { AppProps } from "next/app";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const locale = useRouter().locale as keyof typeof locales;

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={locales[locale]}>
        <BmeThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BmeGlobalStyle />
            <Component {...props.pageProps} />
          </ThemeProvider>
        </BmeThemeProvider>
      </IntlProvider>
    </Provider>
  );
}

export default App;
