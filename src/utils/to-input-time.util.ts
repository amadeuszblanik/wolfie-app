import { default as addLeadingZero } from "./add-leading-zero.util";

const util = (date: Date | string = new Date()): string => {
  try {
    const dateObject = new Date(date);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
  } catch (error) {
    return date.toString();
  }
};

export default util;
