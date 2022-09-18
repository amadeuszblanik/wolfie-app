import type { AppProps } from 'next/app'
import {ThemeProvider} from "styled-components";
import theme, {ThemeVariants} from "../src/settings/theme";
import {useState} from "react";
import {ConfigContext} from "../src/context";
import {GlobalStyles} from "../src/component/styles";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariants>(ThemeVariants.Dark)

  return <ConfigContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      <ThemeProvider theme={theme[selectedTheme]}>
          <GlobalStyles />
          <button onClick={() => setSelectedTheme(ThemeVariants.Dark)}>Dark</button>
            <button onClick={() => setSelectedTheme(ThemeVariants.Light)}>Light</button>
          <Component {...pageProps} />
      </ThemeProvider>
  </ConfigContext.Provider>
}

export default MyApp
