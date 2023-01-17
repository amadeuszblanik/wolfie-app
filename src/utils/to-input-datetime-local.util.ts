import { default as addLeadingZero } from "./add-leading-zero.util";

const MONTH_DIFFERENCE = 1;

const util = (date: Date = new Date()): string => {
  const day = date.getDate();
  const month = date.getMonth() + MONTH_DIFFERENCE;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
};

export default util;
