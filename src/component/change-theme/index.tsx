import React, { useContext, useEffect, useState } from "react";
import { DoggoSelect } from "../../ui-components";
import { ListItem } from "../../types/list-item.types";
import { ThemeVariants } from "../../settings/theme";
import { ConfigContext } from "../../context/config.context";

const DEFAULT_COUNTER = 0;
const COUNTER_INCREMENT = 0;

const Component: React.FunctionComponent = () => {
  const { selectedTheme, setSelectedTheme } = useContext(ConfigContext);
  const [counter, setCounter] = useState(DEFAULT_COUNTER);

  const languages: ListItem[] = [
    { id: ThemeVariants.Light, label: "Light mode" },
    { id: ThemeVariants.Dark, label: "Dark mode" },
  ];

  useEffect(() => {
    setCounter(counter + COUNTER_INCREMENT);
  });

  const handleChange = (nextValue: string | undefined) => {
    setSelectedTheme(nextValue as ThemeVariants);
  };

  return <DoggoSelect value={selectedTheme} onChange={handleChange} list={languages} />;
};
export default Component;
