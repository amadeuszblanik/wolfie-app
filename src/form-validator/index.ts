import { useEffect, useState } from "react";
import { compareObjects, isEmpty } from "bme-utils";
import requiredValidator from "./validators/required.validator";
import emailValidator from "./validators/email.validator";
import nameValidator from "./validators/name.validator";
import passwordValidator from "./validators/password.validator";
import passwordConfirmValidator from "./validators/password-confirm.validator";
import phoneValidator from "./validators/phone.validator";
import { useIntl } from "react-intl";

// @TODO: Fix validations after change;

export type FormValidatorValue = string | boolean;

export enum FormValidators {
  Required = "required",
  Name = "name",
  Email = "email",
  Phone = "phone",
  Password = "password",
  PasswordConfirm = "password_confirm",
}

interface FormField {
  name: string;
  value: FormValidatorValue;
  validator: FormValidators[];
  additionalValues?: string[];
}

interface FormValidatorResponse {
  errors: { [key: string]: string[] };
  formValid: boolean;
}

const addError = (errors: { [key: string]: FormValidators[] }, fieldName: string, error: FormValidators) => {
  if (!errors[fieldName]) {
    errors[fieldName] = [error];
  }

  if (!errors[fieldName].includes(error)) {
    errors[fieldName].push(error);
  }
};

const removeError = (errors: { [key: string]: FormValidators[] }, fieldName: string, error: FormValidators) => {
  if (errors[fieldName] && errors[fieldName].includes(error)) {
    errors[fieldName] = errors[fieldName].filter((e) => e !== error);
  }
};

const useFormValidator = (formFields: FormField[]): FormValidatorResponse => {
  const intl = useIntl();

  const [formValid, setFormValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: FormValidators[] }>({});

  useEffect(() => {
    const nextErrors = { ...errors };

    formFields.forEach(({ name, value, validator, additionalValues }) => {
      validator.forEach((validatorType) => {
        switch (validatorType) {
          case FormValidators.Required:
            requiredValidator(value)
              ? removeError(nextErrors, name, FormValidators.Required)
              : addError(nextErrors, name, FormValidators.Required);
            break;

          case FormValidators.Name:
            nameValidator(value)
              ? removeError(nextErrors, name, FormValidators.Name)
              : addError(nextErrors, name, FormValidators.Name);
            break;

          case FormValidators.Email:
            emailValidator(value)
              ? removeError(nextErrors, name, FormValidators.Email)
              : addError(nextErrors, name, FormValidators.Email);
            break;

          case FormValidators.Phone:
            phoneValidator(value)
              ? removeError(nextErrors, name, FormValidators.Phone)
              : addError(nextErrors, name, FormValidators.Phone);
            break;

          case FormValidators.Password:
            passwordValidator(value)
              ? removeError(nextErrors, name, FormValidators.Password)
              : addError(nextErrors, name, FormValidators.Password);
            break;

          case FormValidators.PasswordConfirm:
            passwordConfirmValidator(value, additionalValues)
              ? removeError(nextErrors, name, FormValidators.PasswordConfirm)
              : addError(nextErrors, name, FormValidators.PasswordConfirm);
            break;
        }
      });
    });

    if (!compareObjects(nextErrors, errors)) {
      setErrors({ ...nextErrors });
      setFormValid(Object.values(nextErrors).every((error) => isEmpty(error)));
    }
  }, [formFields, errors]);

  const translateErrors = () => {
    const response: { [key: string]: string[] } = {};

    Object.entries(errors).forEach(([key, value]) => {
      response[key] = value.map((error) => intl.formatMessage({ id: `error.${error}` }));
    });

    return response;
  };

  return {
    errors: translateErrors(),
    formValid,
  };
};

export default useFormValidator;
