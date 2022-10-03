import { FormValidatorValue } from "../index";

const passwordConfirmValidator = (value: FormValidatorValue, additionalValues?: FormValidatorValue[]): boolean => {
  if (!additionalValues) {
    return false;
  }

  const [password] = additionalValues;

  return value === password;
};

export default passwordConfirmValidator;
