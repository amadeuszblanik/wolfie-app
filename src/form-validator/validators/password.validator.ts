import { FormValidatorValue } from "../index";

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const passwordValidator = (value: FormValidatorValue): boolean => PASSWORD_REGEX.test(String(value));

export default passwordValidator;
