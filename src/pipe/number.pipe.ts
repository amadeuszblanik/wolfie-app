const DEFAULT_DECIMALS = 2;

const numberPipe = (value: number, decimals = DEFAULT_DECIMALS): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return `-.${Array(decimals).fill("-")}`;
  }

  return value.toFixed(decimals);
};

export default numberPipe;
