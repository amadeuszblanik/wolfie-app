import { default as addLeadingZero } from "./add-leading-zero.util";

const util = (date: Date = new Date()): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
};

export default util;
