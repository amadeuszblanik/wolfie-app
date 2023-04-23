const DEFAULT_WIDTH = 0;

const Breakpoints = {
  All: 0,
  iPhoneRetro: 320,
  iPhoneMini: 375,
  iPhone: 390,
  iPhonePlus: 428,
  iPadMini: 768,
  iPad: 1024,
  iPadPro: 1366,
  Desktop: 1440,
};

const usePipe = (value: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  value = new Date(value);
  const width = window ? window.innerWidth : DEFAULT_WIDTH;

  if (!options) {
    options =
      width >= Breakpoints.iPhonePlus
        ? { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        : width >= Breakpoints.iPhoneMini
        ? { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
        : { year: "numeric", month: "2-digit", day: "numeric", hour: "numeric", minute: "numeric" };
  }

  return value.toLocaleDateString(localStorage.getItem("locale") || navigator.language, options);
};

export default usePipe;
