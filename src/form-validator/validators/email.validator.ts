import { FormValidatorValue } from "../index";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const emailValidator = (value: FormValidatorValue): boolean => EMAIL_REGEX.test(String(value));

export default emailValidator;
