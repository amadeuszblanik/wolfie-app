import Breakpoints from "../settings/breakpoints";

const DEFAULT_WIDTH = 0;

const datePipe = (value: Date, options?: Intl.DateTimeFormatOptions): string => {
  const width = window ? window.innerWidth : DEFAULT_WIDTH;

  options =
    width >= Breakpoints.iPhonePlus
      ? { year: "numeric", month: "long", day: "numeric" }
      : width >= Breakpoints.iPhoneMini
      ? { year: "numeric", month: "short", day: "numeric" }
      : { year: "numeric", month: "2-digit", day: "numeric" };

  return value.toLocaleDateString(localStorage.getItem("locale") || navigator.language, options);
};

export default datePipe;
