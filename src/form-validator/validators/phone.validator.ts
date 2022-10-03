import { FormValidatorValue } from "../index";

const PHONE_REGEX = /^\+?[0-9]{10,}$/;

const phoneValidator = (value: FormValidatorValue): boolean => PHONE_REGEX.test(String(value));

export default phoneValidator;
