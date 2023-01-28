import { isEmpty } from "bme-utils";
import { FormValidators } from "../Control/types";

const PASSWORD_MIN_LENGTH = 8;

const formBuilderValidator = (validator: FormValidators[], value: string): string[] => {
  const errors: string[] = [];

  validator.forEach((type) => {
    if (type === "required" && isEmpty(value)) {
      errors.push("This field is required");
    }

    if (type === "requiredTrue" && value !== "true") {
      errors.push("This field is required");
    }

    if (type === "email" && !isEmpty(value)) {
      if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        errors.push("Invalid email address");
      }
    }

    if (type === "password" && !isEmpty(value)) {
      const passwordMissingElements = [];

      if (value.length < PASSWORD_MIN_LENGTH) {
        passwordMissingElements.push("at least 8 characters");
      }

      if (!value.match(/[a-z]/)) {
        passwordMissingElements.push("a lowercase letter");
      }

      if (!value.match(/[A-Z]/)) {
        passwordMissingElements.push("an uppercase letter");
      }

      if (!value.match(/[0-9]/)) {
        passwordMissingElements.push("a number");
      }

      if (!value.match(/[#?!@$%^&*-]/)) {
        passwordMissingElements.push("a special character");
      }

      return !isEmpty(passwordMissingElements)
        ? errors.push(`Password must contain ${passwordMissingElements.join(", ")}`)
        : null;
    }
  });

  return errors;
};

export default formBuilderValidator;
