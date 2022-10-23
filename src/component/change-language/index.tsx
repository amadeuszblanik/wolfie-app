import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { DoggoSelect } from "../../ui-components";
import { ListItem } from "../../types/list-item.types";

const Component: React.FunctionComponent = () => {
  const router = useRouter();
  const intl = useIntl();

  const [selectedLanguage, setSelectedLanguage] = React.useState(intl.locale);

  const languages: ListItem[] = [
    { id: "en-GB", label: "English (United Kingdom)" },
    { id: "fr-FR", label: "Français" },
    { id: "pl-PL", label: "Polski" },
  ];

  useEffect(() => {
    void router.push(router.pathname, router.pathname, { locale: selectedLanguage });
  }, [selectedLanguage]);

  return (
    <DoggoSelect
      value={selectedLanguage}
      onChange={(nextValue) => setSelectedLanguage(nextValue || intl.locale)}
      list={languages}
    />
  );
};
export default Component;
