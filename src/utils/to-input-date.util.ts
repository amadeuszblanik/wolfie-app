import { default as addLeadingZero } from "./add-leading-zero.util";

const MONTH_DIFFERENCE = 1;

const util = (date: Date | string = new Date()): string => {
  date = new Date(date);

  const day = date.getDate();
  const month = date.getMonth() + MONTH_DIFFERENCE;
  const year = date.getFullYear();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export default util;
