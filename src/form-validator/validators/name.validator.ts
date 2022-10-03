import { FormValidatorValue } from "../index";

const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const nameValidator = (value: FormValidatorValue): boolean => NAME_REGEX.test(String(value));

export default nameValidator;
