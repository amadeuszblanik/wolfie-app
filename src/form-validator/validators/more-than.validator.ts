import { FormValidatorValue } from "../index";

const requiredValidator = (value: FormValidatorValue, additionalValue?: FormValidatorValue[]): boolean => {
  if (!additionalValue) {
    return false;
  }

  const [moreThanValue] = additionalValue;

  if (value && moreThanValue && (typeof moreThanValue === "number" || typeof value === "number")) {
    return value >= moreThanValue;
  }

  return false;
};

export default requiredValidator;
