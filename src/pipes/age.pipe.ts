import { useIntl } from "react-intl";
import { dateDifference } from "../utils";

const EMPTY_VALUE = 0;
const MANY_VALUE = 1;
const RESPONSE_VALUE = 2;

const usePipe = (value: Date | string): string => {
  value = new Date(value);

  const intl = useIntl();
  const response: string[] = [];

  if (value.getTime() >= new Date().getTime()) {
    return intl.formatMessage({ id: "common.date.not_born" });
  }

  const { years, months, weeks, days } = dateDifference(value, new Date());

  if (years > EMPTY_VALUE) {
    const yearsText =
      years > MANY_VALUE
        ? intl.formatMessage({ id: "common.date.years" })
        : intl.formatMessage({ id: "common.date.year" });

    response.push(`${years} ${yearsText}`);
  }

  if (months > EMPTY_VALUE) {
    const monthsText =
      months > MANY_VALUE
        ? intl.formatMessage({ id: "common.date.months" })
        : intl.formatMessage({ id: "common.date.month" });

    response.push(`${months} ${monthsText}`);
  }

  if (response.length >= RESPONSE_VALUE) {
    return response.join(" ");
  }

  if (weeks > EMPTY_VALUE) {
    const weeksText =
      weeks > MANY_VALUE
        ? intl.formatMessage({ id: "common.date.weeks" })
        : intl.formatMessage({ id: "common.date.week" });

    response.push(`${weeks} ${weeksText}`);
  }

  if (response.length >= RESPONSE_VALUE) {
    return response.join(" ");
  }

  if (days > EMPTY_VALUE) {
    const daysText =
      days > MANY_VALUE
        ? intl.formatMessage({ id: "common.date.days" })
        : intl.formatMessage({ id: "common.date.day" });

    response.push(`${days} ${daysText}`);
  }

  return response.length > EMPTY_VALUE ? response.join(" ") : intl.formatMessage({ id: "common.date.just_born" });
};

export default usePipe;
