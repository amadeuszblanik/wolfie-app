import { useIntl } from "react-intl";

const datePipe = (
  value: Date,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  return value.toLocaleDateString(intl.locale, options);
};

export default datePipe;
