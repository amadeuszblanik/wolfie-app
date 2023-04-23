const TIME_IN_DAY = 86400000;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30.437;
const MONTHS_IN_YEAR = 12;

export interface DateDifference {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

const util = (dateA: Date | string, dateB: Date | string, formatted = true): DateDifference => {
  dateA = new Date(dateA);
  dateB = new Date(dateB);

  const diff = Math.abs(dateA.getTime() - dateB.getTime());
  let daysDiff = Math.floor(diff / TIME_IN_DAY);

  const years = Math.floor(daysDiff / DAYS_IN_MONTH / MONTHS_IN_YEAR);

  if (formatted) {
    daysDiff = daysDiff - years * DAYS_IN_MONTH * MONTHS_IN_YEAR;
  }

  const months = Math.floor(daysDiff / DAYS_IN_MONTH);

  if (formatted) {
    daysDiff = daysDiff - months * DAYS_IN_MONTH;
  }

  const weeks = Math.floor(daysDiff / DAYS_IN_WEEK);

  if (formatted) {
    daysDiff = daysDiff - weeks * DAYS_IN_WEEK;
  }

  const days = Math.floor(daysDiff);

  return { years, months, weeks, days };
};

export default util;
