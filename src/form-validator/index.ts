import { useEffect, useState } from "react";
import { compareObjects, firstElement, isEmpty } from "bme-utils";
import { useIntl } from "react-intl";
import requiredValidator from "./validators/required.validator";
import emailValidator from "./validators/email.validator";
import nameValidator from "./validators/name.validator";
import passwordValidator from "./validators/password.validator";
import passwordConfirmValidator from "./validators/password-confirm.validator";
import phoneValidator from "./validators/phone.validator";
import moreThanValidator from "./validators/more-than.validator";

// @TODO: Fix validations after change;
// @TODO: Add validator for arrays;

export type FormValidatorValue = string | number | boolean | undefined;

export enum FormValidators {
  Required = "required",
  Name = "name",
  Email = "email",
  Phone = "phone",
  MoreThan = "more_than",
  Password = "password",
  PasswordConfirm = "password_confirm",
}

interface FormField {
  name: string;
  value: FormValidatorValue;
  validator: FormValidators[];
  additionalValues?: FormValidatorValue[];
}

interface FormValidatorError {
  validator: FormValidators;
  additionalValue: FormValidatorValue[] | undefined;
}

interface FormValidatorResponse {
  errors: { [key: string]: string[] };
  formValid: boolean;
}

const addError = (
  errors: { [key: string]: FormValidatorError[] },
  fieldName: string,
  error: FormValidators,
  additionalValue: FormValidatorValue[] | undefined,
) => {
  if (!errors[fieldName]) {
    errors[fieldName] = [
      {
        validator: error,
        additionalValue,
      },
    ];
  }

  if (!errors[fieldName].map(({ validator }) => validator).includes(error)) {
    errors[fieldName].push({
      validator: error,
      additionalValue,
    });
  }
};

const removeError = (errors: { [key: string]: FormValidatorError[] }, fieldName: string, error: FormValidators) => {
  if (errors[fieldName] && errors[fieldName].map(({ validator }) => validator).includes(error)) {
    errors[fieldName] = errors[fieldName].filter((e) => e.validator !== error);
  }
};

const useFormValidator = (formFields: FormField[]): FormValidatorResponse => {
  const intl = useIntl();

  const [formValid, setFormValid] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: FormValidatorError[] }>({});

  useEffect(() => {
    const nextErrors = { ...errors };

    formFields.forEach(({ name, value, validator, additionalValues }) => {
      validator.forEach((validatorType) => {
        switch (validatorType) {
          case FormValidators.Required:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            requiredValidator(value)
              ? removeError(nextErrors, name, FormValidators.Required)
              : addError(nextErrors, name, FormValidators.Required, additionalValues);
            break;

          case FormValidators.Name:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            nameValidator(value)
              ? removeError(nextErrors, name, FormValidators.Name)
              : addError(nextErrors, name, FormValidators.Name, additionalValues);
            break;

          case FormValidators.Email:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            emailValidator(value)
              ? removeError(nextErrors, name, FormValidators.Email)
              : addError(nextErrors, name, FormValidators.Email, additionalValues);
            break;

          case FormValidators.Phone:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            phoneValidator(value)
              ? removeError(nextErrors, name, FormValidators.Phone)
              : addError(nextErrors, name, FormValidators.Phone, additionalValues);
            break;

          case FormValidators.MoreThan:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            moreThanValidator(value, additionalValues)
              ? removeError(nextErrors, name, FormValidators.MoreThan)
              : addError(nextErrors, name, FormValidators.MoreThan, additionalValues);
            break;

          case FormValidators.Password:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            passwordValidator(value)
              ? removeError(nextErrors, name, FormValidators.Password)
              : addError(nextErrors, name, FormValidators.Password, additionalValues);
            break;

          case FormValidators.PasswordConfirm:
            // @TODO Refactor this later;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            passwordConfirmValidator(value, additionalValues)
              ? removeError(nextErrors, name, FormValidators.PasswordConfirm)
              : addError(nextErrors, name, FormValidators.PasswordConfirm, additionalValues);
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
      response[key] = value.map((error) =>
        intl.formatMessage(
          { id: `error.${error.validator}` },
          { value: error.additionalValue ? firstElement(error.additionalValue) : "" },
        ),
      );
    });

    return response;
  };

  return {
    errors: translateErrors(),
    formValid,
  };
};

export default useFormValidator;
