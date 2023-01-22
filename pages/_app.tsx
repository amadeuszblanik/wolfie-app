import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import dark from "bme-ui/dist/themes/dark";
import { locales } from "../src/settings";
import { GlobalStyles } from "../src/components";
import { wrapper } from "../src/store";
import type { AppProps } from "next/app";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const locale = useRouter().locale as keyof typeof locales;

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--bme-vh", `${vh}px`);
    };

    updateVh();
    window.addEventListener("resize", updateVh);

    return () => window.removeEventListener("resize", updateVh);
  }, []);

  return (
    <ThemeProvider theme={{ ...dark }}>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={locales[locale]}>
          <GlobalStyles />
          <Component {...props.pageProps} />
        </IntlProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
