import addLeadingZero from "./add-leading-zero.utils";

const MONTH_DIFFERENCE = 1;

const util = (date: Date): string => {
  date = new Date(date);

  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + MONTH_DIFFERENCE);
  const day = addLeadingZero(date.getDate());
  const hour = addLeadingZero(date.getHours());
  const minute = addLeadingZero(date.getMinutes());

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export default util;
