const LEADING_ZERO_BREAKPOINT = 10;

const addLeadingZero = (value: number): string => (value < LEADING_ZERO_BREAKPOINT ? `0${value}` : `${value}`);

export default addLeadingZero;
