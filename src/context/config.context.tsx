/* eslint-disable @typescript-eslint/no-empty-function */
// @TODO REFACTOR
import React, { createContext, useEffect, useState } from "react";
import { ThemeVariants } from "../settings/theme";
import { ConfigResponseModel } from "../api/response-model/config.response-model";
import { useGetConfig } from "../api/queries";

export interface ConfigContextType {
  selectedTheme: ThemeVariants;
  setSelectedTheme: (theme: ThemeVariants) => void;
  scrollEnabled: boolean;
  setScrollEnabled: (enabled: boolean) => void;
  userConfig: ConfigResponseModel | undefined;
}

export const ConfigContext = createContext<ConfigContextType>({
  selectedTheme: ThemeVariants.Dark,
  setSelectedTheme: () => {},
  scrollEnabled: true,
  setScrollEnabled: () => {},
  userConfig: undefined,
});

const DEFAULT_COUNTER = 0;
const COUNTER_INCREMENT = 1;

const Component: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariants>(ThemeVariants.Dark);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [counterRender, setCounterRender] = useState<number>(DEFAULT_COUNTER);
  const { response: userConfig } = useGetConfig();

  useEffect(() => {
    setCounterRender(counterRender + COUNTER_INCREMENT);
  }, [selectedTheme, scrollEnabled, counterRender]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme") as ThemeVariants | null;

    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (scrollEnabled) {
      document.body.style.overflow = "auto";

      return;
    }

    document.body.style.overflow = "hidden";
  }, [scrollEnabled]);

  useEffect(() => {
    if (counterRender) {
      localStorage.setItem("selectedTheme", selectedTheme);
    }
  }, [selectedTheme, counterRender]);

  useEffect(() => {
    // @TODO: Remove on production
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.setSelectedTheme = setSelectedTheme;
  }, [setSelectedTheme]);

  return (
    <ConfigContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        scrollEnabled,
        setScrollEnabled,
        userConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default Component;
