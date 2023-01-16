const ADD_LEADING_ZERO_BREAKPOINT = 10;

const util = (value: number): string => (value < ADD_LEADING_ZERO_BREAKPOINT ? `0${value}` : `${value}`);

export default util;
