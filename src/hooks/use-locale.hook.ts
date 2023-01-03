import { useEffect, useState } from "react";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_COUNTRY = "GB";

const useHook = (): { language: string; country: string } => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    const [localeLanguage, localeCountry] = navigator.language.split("-");

    setLanguage(localeLanguage || DEFAULT_LANGUAGE);
    setCountry(localeCountry || DEFAULT_COUNTRY);
  }, [setLanguage, setCountry]);

  return {
    language,
    country,
  };
};

export default useHook;
