import addLeadingZero from "./add-leading-zero.utils";

const MONTH_DIFFERENCE = 1;

const toDateUtils = (date: Date): string => {
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + MONTH_DIFFERENCE);
  const day = addLeadingZero(date.getDate());

  return `${year}-${month}-${day}`;
};

export default toDateUtils;
