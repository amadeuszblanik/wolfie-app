const datePipe = (
  value: Date,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string => value.toLocaleDateString(localStorage.getItem("locale") || navigator.language, options);

export default datePipe;
