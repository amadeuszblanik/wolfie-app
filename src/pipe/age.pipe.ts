import { dateDifference } from "../utils";
import { useIntl } from "react-intl";

const EMPTY_VALUE = 0;
const MANY_VALUE = 1;
const RESPONSE_VALUE = 2;

const agePipe = (value: Date): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();
  const response: string[] = [];

  if (value.getTime() >= new Date().getTime()) {
    return intl.formatMessage({ id: "common.not_born" });
  }

  const { years, months, weeks, days } = dateDifference(value, new Date());

  if (years > EMPTY_VALUE) {
    const yearsText =
      years > MANY_VALUE ? intl.formatMessage({ id: "common.years" }) : intl.formatMessage({ id: "common.year" });

    response.push(`${years} ${yearsText}`);
  }

  if (months > EMPTY_VALUE) {
    const monthsText =
      months > MANY_VALUE ? intl.formatMessage({ id: "common.months" }) : intl.formatMessage({ id: "common.month" });

    response.push(`${months} ${monthsText}`);
  }

  if (response.length >= RESPONSE_VALUE) {
    return response.join(" ");
  }

  if (weeks > EMPTY_VALUE) {
    const weeksText =
      weeks > MANY_VALUE ? intl.formatMessage({ id: "common.weeks" }) : intl.formatMessage({ id: "common.week" });

    response.push(`${weeks} ${weeksText}`);
  }

  if (response.length >= RESPONSE_VALUE) {
    return response.join(" ");
  }

  if (days > EMPTY_VALUE) {
    const daysText =
      days > MANY_VALUE ? intl.formatMessage({ id: "common.days" }) : intl.formatMessage({ id: "common.day" });

    response.push(`${days} ${daysText}`);
  }

  return response.length > EMPTY_VALUE ? response.join(" ") : intl.formatMessage({ id: "common.just_born" });
};

export default agePipe;
