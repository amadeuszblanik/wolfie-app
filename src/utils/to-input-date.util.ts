import { default as addLeadingZero } from "./add-leading-zero.util";

const MONTH_DIFFERENCE = 1;

const util = (date: Date = new Date()): string => {
  const day = date.getDate();
  const month = date.getMonth() + MONTH_DIFFERENCE;
  const year = date.getFullYear();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export default util;
