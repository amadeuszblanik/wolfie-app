import { ThemeProvider } from "styled-components";
import { BmeGlobalStyle, BmeThemeProvider } from "bme-ui";
import { theme } from "../src/settings";
import { GlobalStyles } from "../src/components";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BmeThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BmeGlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </BmeThemeProvider>
  );
}
