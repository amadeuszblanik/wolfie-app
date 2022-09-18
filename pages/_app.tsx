import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme, { ThemeVariants } from "../src/settings/theme";
import { useEffect, useState } from "react";
import { ConfigContext } from "../src/context";
import { GlobalStyles } from "../src/component/styles";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariants>(ThemeVariants.Dark);

  useEffect(() => {
    // @TODO: Remove on production
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.setSelectedTheme = setSelectedTheme;
  });

  return (
    <ConfigContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      <ThemeProvider theme={theme[selectedTheme]}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ConfigContext.Provider>
  );
}

export default MyApp;
