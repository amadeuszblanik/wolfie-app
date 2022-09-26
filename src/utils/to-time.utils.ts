import addLeadingZero from "./add-leading-zero.utils";

const toTimeUtils = (date: Date): string => {
  const hour = addLeadingZero(date.getHours());
  const minute = addLeadingZero(date.getMinutes());

  return `${hour}:${minute}`;
};

export default toTimeUtils;
