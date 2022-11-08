const DEFAULT_DECIMALS = 2;

const numberPipe = (value: number, decimals = DEFAULT_DECIMALS): string =>
  Intl.NumberFormat(localStorage.getItem("locale") || navigator.language, {
    maximumFractionDigits: decimals,
  }).format(value);
export default numberPipe;
