import { isEmpty } from "bme-utils";
import { FormValidatorValue } from "../index";

const requiredValidator = (value: FormValidatorValue): boolean => {
  switch (typeof value) {
    case "number":
      return !isNaN(value);
    case "string":
      return !isEmpty(value);
    case "boolean":
      return value;

    default:
      return false;
  }
};

export default requiredValidator;
