const THOUSAND_VALUE = 11111;
const DECIMAL_VALUE = 1.1;

const utils = (value: string): number => {
  const numberFormatter = new Intl.NumberFormat(localStorage.getItem("locale") || navigator.language);
  const thousandSeparator = numberFormatter.format(THOUSAND_VALUE).replace(/1/g, "");
  const decimalSeparator = numberFormatter.format(DECIMAL_VALUE).replace(/1/g, "");

  if (value === "") {
    return NaN;
  }

  const valueWithoutThousandSeparator = thousandSeparator
    ? value.replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
    : value;
  const valueWithDotAsDecimalSeparator = valueWithoutThousandSeparator.replace(
    new RegExp(`\\${decimalSeparator}`, "g"),
    ".",
  );

  return parseFloat(valueWithDotAsDecimalSeparator);
};

export default utils;
