const LEADING_ZERO_BREAKPOINT = 10;

const addLeadingZero = (value: number): string => {
  return value < LEADING_ZERO_BREAKPOINT ? `0${value}` : `${value}`;
};

export default addLeadingZero;
