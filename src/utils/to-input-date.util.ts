const ADD_LEADING_ZERO_BREAKPOINT = 10;
const MONTH_DIFFERENCE = 1;

const addLeadingZero = (value: number): string => (value < ADD_LEADING_ZERO_BREAKPOINT ? `0${value}` : `${value}`);

const util = (date: Date = new Date()): string => {
  const day = date.getDate();
  const month = date.getMonth() + MONTH_DIFFERENCE;
  const year = date.getFullYear();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export default util;
