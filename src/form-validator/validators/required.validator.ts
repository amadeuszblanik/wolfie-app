import { FormValidatorValue } from "../index";
import { isEmpty } from "bme-utils";

const requiredValidator = (value: FormValidatorValue): boolean => {
  switch (typeof value) {
    case "string":
      return !isEmpty(value);
    case "boolean":
      return value;

    default:
      return false;
  }
};

export default requiredValidator;
