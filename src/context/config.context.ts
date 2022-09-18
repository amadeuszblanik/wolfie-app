import { createContext } from "react";
import { ThemeVariants } from "../settings/theme";

export interface ConfigContext {
  selectedTheme: ThemeVariants;
  setSelectedTheme: (theme: ThemeVariants) => void;
}

const Config = createContext<ConfigContext>({
  selectedTheme: ThemeVariants.Dark,
  setSelectedTheme: (selectedTheme) => {},
});

export default Config;
